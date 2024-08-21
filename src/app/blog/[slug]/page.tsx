import { BlogFrontmatter, cachedReadFile, getBlogSlugs, getCachedBlogLocation } from "@/helpers/frontmatter.helper";
import { promises as fs } from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { redirect } from "next/navigation";
import path from "path";
import { Suspense } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import RemarkFlexibleToc from "remark-flexible-toc";
import Tag from "@/components/Tag";
import Contents from "@/components/Contents";
import { compilePageMdx, MarkdownComponents } from "@/helpers/mdx.helper";
import { IconLink } from "@tabler/icons-react";
import rehypePrettyCode from "rehype-pretty-code";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getBlogSlugs();

  return posts.map((post) => ({
    slug: post
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {

  let contentStr: string;
  try {
    const path = await getCachedBlogLocation(params.slug);
    if (path === null) { throw Error(); }

    contentStr = await cachedReadFile(path, 'utf-8');
  } catch {
    return false;
  }


  const { toc, content, frontmatter } = await compilePageMdx<BlogFrontmatter>(contentStr, '/blog-assets/');
  const published = new Date(frontmatter.publishDate);

  return (
    <main className="w-full">
      <Suspense fallback={<></>}>
        <hgroup className="lg:py-sm px-sm py-md mt-3xs-xl md:col-span-9 col-span-12 bg-secondary-0 dark:bg-secondary-1000 overflow-hidden rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5" aria-labelledby={`section-${frontmatter.title}`}>
          <h1 className="text-2xl text-center font-semibold">{frontmatter.title}</h1>
          <span className="sr-only">Published on: {published.toLocaleDateString('en-us', { month: "long", day: "numeric", year: "numeric" })}</span>
          <p className="text-center" aria-hidden={true}>{published.toLocaleDateString('en-us', { month: "short", day: "numeric", year: "numeric" })}</p>
        </hgroup>
        <div className="flex flex-row">
          <div className="lg:py-sm px-sm py-md mt-3xs-xl md:w-9/12 w-full md:mr-sm md:col-span-9 col-span-12 bg-secondary-0 dark:bg-secondary-1000 overflow-hidden rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5" aria-labelledby={`section-${frontmatter.title}`}>
            {content}
          </div>
          <div className="md:block hidden mt-3xs-xl w-3/12 ml-sm md:col-span-9 col-span-12">
            <aside className="sticky top-10 flex flex-col h-min lg:py-sm px-sm py-md bg-secondary-0 dark:bg-secondary-1000 rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5" aria-labelledby={`section-${frontmatter.title}`}>
              <Contents title={frontmatter.title} ast={toc} />
              <span className="my-1 font-medium">Tags</span>
              <div className="flex flex-row flex-wrap">
                {frontmatter.tags.map(tag => <Tag page="blog" key={`${frontmatter.slug}-${tag}`} tagName={tag} className="mr-2 mb-2" />)}
              </div>
            </aside>
          </div>
        </div>
      </Suspense>
    </main>
  )
}
