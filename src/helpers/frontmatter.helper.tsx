import { promises as fs } from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { cache } from "react";
import 'server-only';
import { BlogCategoryDescriptions, ProjectCategoryDescriptions } from "../../content/categories";


export interface Frontmatter {
    published: boolean;
    thumbnail?: string;
    title: string;
    slug: string;
    publishDate: string;
    lastUpdated: string;
    featured: boolean;
    category: string;
    tags: string[];
    excerpt: string;
}

export interface BlogFrontmatter extends Frontmatter {
    category: keyof typeof BlogCategoryDescriptions;
}

export interface ProjectFrontmatter extends Frontmatter {
    category: keyof typeof ProjectCategoryDescriptions;
}


type TFrontmatter<T> = T extends 'projects' ? ProjectFrontmatter : BlogFrontmatter;

function validateFrontmatter(x: any): x is Frontmatter {
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

export async function getSlugs<T extends 'projects' | 'blog'>(type: T) {
    const posts = await getCachedPostPaths(type);
    const slugs = [];

    for (const post of posts) {
        try {
            const data = await cachedReadFile(`${process.cwd()}/content/${type}/${post}`);
            const serial = await serialize<{}, TFrontmatter<T>>(data.toString(), { parseFrontmatter: true });

            if (validateFrontmatter(serial.frontmatter) && serial.frontmatter.published) {
                slugs.push(serial.frontmatter.slug);
            }
        }
        catch {
            continue;
        }
    }

    return slugs;
}

export async function getFileLocation<T extends 'projects' | 'blog'>(type: T, slug: string) {
    const posts = await getCachedPostPaths(type);
    for (const post of posts) {
        try {
            const data = await cachedReadFile(`${process.cwd()}/content/${type}/${post}`);
            const serial = await serialize<{}, TFrontmatter<T>>(data.toString(), { parseFrontmatter: true });

            if (validateFrontmatter(serial.frontmatter) && serial.frontmatter.published && serial.frontmatter.slug === slug) {
                return `${process.cwd()}/content/${type}/${post}`;
            }
        }
        catch {
            continue;
        }
    }

    return null;
}


export async function getRecentPosts<T extends 'projects' | 'blog'>(type: T, category: (typeof type extends "projects" ? keyof typeof ProjectCategoryDescriptions : keyof typeof BlogCategoryDescriptions) | undefined, tags: string[] | undefined) {
    const posts = await getCachedPostPaths(type);
    const recent: TFrontmatter<T>[] = [];

    mainLoop: for (const post of posts) {
        try {
            const data = await cachedReadFile(`${process.cwd()}/content/${type}/${post}`);
            const serial = await serialize<{}, BlogFrontmatter>(data.toString(), { parseFrontmatter: true });

            if (validateFrontmatter(serial.frontmatter)) {
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
export async function getSidebarContent<T extends 'projects' | 'blog'>(base: T) {
    const posts = await getCachedPostPaths(base);
    const frontmatters: TFrontmatter<T>[] = [];
    const categories = new Set<string>();
    const tagDict: Record<string, number> = {};

    for (const post of posts) {
        try {
            const data = await cachedReadFile(`${process.cwd()}/content/${base}/${post}`);
            const serial = await serialize<{}, TFrontmatter<T>>(data.toString(), { parseFrontmatter: true });

            if (validateFrontmatter(serial.frontmatter)) {
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

export const getCachedSlugs = cache(getSlugs);
export const getCachedFileLocation = cache(getFileLocation);
export const getCachedSidebarContent = cache(getSidebarContent);
export const getCachedRecentPosts = cache(getRecentPosts);