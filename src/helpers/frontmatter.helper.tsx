import { promises as fs } from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { cache } from "react";
import 'server-only';

// The categories that appear on the sidebar are NOT based on this - they are 
// every category that is actually returned by a sweep of every post's frontmatter.
export const CategoryDescriptions = {
    "Musings": "Not all things worth saying are easy to categorize. This section consists of any random thoughts, opinions, and ideas that I have.",
};

export interface BlogFrontmatter {
    published: boolean;
    thumbnail?: string;
    title: string;
    slug: string;
    publishDate: string;
    lastUpdated: string;
    featured: boolean;
    category: keyof typeof CategoryDescriptions;
    tags: string[];
    excerpt: string;
}

function validateBlogFrontmatter(x: any): x is BlogFrontmatter {
    return 'published' in x && 'title' in x && 'slug' in x && 'publishDate' in x && 'featured' in x && 'category' in x && 'tags' in x && 'excerpt' in x && 'lastUpdated' in x &&
        typeof x.published === 'boolean' && typeof x.slug === 'string' && typeof x.publishDate === 'string' && typeof x.featured === 'boolean' &&
        typeof x.category === 'string' && typeof x.tags === 'object' && typeof x.excerpt === 'string' && typeof x.lastUpdated === 'string'
}

async function getPostPaths(base: string) {
    const dirSearch = await fs.readdir(process.cwd() + '/content/' + base + '/', { recursive: true });
    return dirSearch.filter(value => value.endsWith('/index.mdx'));
}

export const getCachedPostPaths = cache(getPostPaths);
export const cachedReadFile = cache(fs.readFile);

export async function getBlogSlugs() {
    const posts = await getCachedPostPaths('blog')
    const slugs = [];

    for (const post of posts) {
        try {
            const data = await cachedReadFile(`${process.cwd()}/content/blog/${post}`);
            const serial = await serialize<{}, BlogFrontmatter>(data.toString(), { parseFrontmatter: true });

            if (validateBlogFrontmatter(serial.frontmatter) && serial.frontmatter.published) {
                slugs.push(serial.frontmatter.slug);
            }
        }
        catch {
            continue;
        }
    }

    return slugs;
}

export async function getBlogLocation(slug: string) {
    const posts = await getCachedPostPaths('blog')
    for (const post of posts) {
        try {
            const data = await cachedReadFile(`${process.cwd()}/content/blog/${post}`);
            const serial = await serialize<{}, BlogFrontmatter>(data.toString(), { parseFrontmatter: true });

            if (validateBlogFrontmatter(serial.frontmatter) && serial.frontmatter.published && serial.frontmatter.slug === slug) {
                return `${process.cwd()}/content/blog/${post}`;
            }
        }
        catch {
            continue;
        }
    }

    return null;
}

export async function getRecentPosts(base: string, category: keyof typeof CategoryDescriptions | undefined, tags: string[] | undefined) {
    const posts = await getCachedPostPaths(base);
    const recent = [];

    mainLoop: for (const post of posts) {
        try {
            const data = await cachedReadFile(`${process.cwd()}/content/${base}/${post}`);
            const serial = await serialize<{}, BlogFrontmatter>(data.toString(), { parseFrontmatter: true });

            if (validateBlogFrontmatter(serial.frontmatter)) {
                let isCorrectCategory = category === undefined || serial.frontmatter.category.toLowerCase() === category.toLowerCase();

                if (serial.frontmatter.published && isCorrectCategory) {
                    if (tags !== undefined) {
                        for (const tag of tags) {
                            if (serial.frontmatter.tags.includes(tag) === false) {
                                continue mainLoop;
                            }
                        }
                    }

                    recent.push(serial.frontmatter);
                }

            }

        }
        catch {
            continue;
        }
    }

    recent.sort((a, b) => {
        const aDate = new Date(a.lastUpdated);
        const bDate = new Date(b.lastUpdated);

        return aDate.getTime() - bDate.getTime();
    })

    return recent;
}

// Separated from the other one for cacheing... This doesn't change!
export async function getSidebarContent(base: string) {
    const posts = await getCachedPostPaths(base);
    const frontmatters = [];
    const categories = new Set<string>();
    const tagDict: Record<string, number> = {};

    for (const post of posts) {
        try {
            const data = await cachedReadFile(`${process.cwd()}/content/${base}/${post}`);
            const serial = await serialize<{}, BlogFrontmatter>(data.toString(), { parseFrontmatter: true });

            if (validateBlogFrontmatter(serial.frontmatter)) {
                if (serial.frontmatter.published && serial.frontmatter.featured) {
                    frontmatters.push(serial.frontmatter);
                }

                categories.add(serial.frontmatter.category);

                for (const tag of serial.frontmatter.tags) {
                    if (tag in tagDict) {
                        tagDict[tag] += 1;
                    } else {
                        tagDict[tag] = 1;
                    }
                }

            }
        }
        catch {
            continue;
        }
    }

    const tags = Object.keys(tagDict);


    frontmatters.sort((a, b) => {
        const aDate = new Date(a.lastUpdated);
        const bDate = new Date(b.lastUpdated);

        return aDate.getTime() - bDate.getTime();
    })

    tags.sort((a, b) => {
        return tagDict[b] - tagDict[a];
    })


    return {
        featured: frontmatters,
        tags,
        categories: Array.from(categories.values()).sort()
    };
}

export const getCachedBlogSlugs = cache(getBlogSlugs);
export const getCachedBlogLocation = cache(getBlogLocation);
export const getCachedSidebarContent = cache(getSidebarContent);
export const getCachedRecentPosts = cache(getRecentPosts);