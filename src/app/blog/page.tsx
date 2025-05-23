import Category from "@/components/Category";
import ContentCard, { ContentCardFallback } from "@/components/ContentCard";
import HomeSection from "@/components/HomeSection";
import PageHeading from "@/components/PageHeading";
import Tag from "@/components/Tag";
import {
  getCachedRecentPosts,
  getCachedSidebarContent,
} from "@/helpers/frontmatter.helper";
import { SectionH1 } from "@/helpers/mdx.helper";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import {
  BlogCategoryDescriptions,
  BlogDesc,
} from "../../../content/categories";
import Sidebar, { SidebarFallback } from "@/components/Sidebar";

export const metadata: Metadata = {
  metadataBase: new URL("https://bedouch.net"),
  title: "Blog",
  description: "",
  generator: "Next.js",
  keywords: [
    "blog",
    "frontend",
    "react",
    "computer science",
    "student",
    "transit",
  ],
  authors: [{ name: "Jonah Bedouch" }],
  openGraph: {
    title: "Blog | Jonah Bedouch",
    description: BlogDesc,
    url: `https://bedouch.net/projects`,
    siteName: "Jonah Bedouch",
    locale: "en-US",
    type: "website",
    images: [{ url: "/avatar.png", alt: "Jonah's headshot" }],
  },
  twitter: {
    card: "summary",
    title: `Blog | Jonah Bedouch`,
    description: BlogDesc,
    creator: "@jonahbedouch",
    images: ["/avatar.png"],
  },
};

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search = await searchParams;

  let appliedTags: string[] | undefined = undefined;
  let appliedCategory: keyof typeof BlogCategoryDescriptions | undefined =
    undefined;
  if ("filter" in search && search.filter !== undefined) {
    if (typeof search.filter === "string") {
      appliedTags = [search.filter];
    } else {
      appliedTags = search.filter;
    }
  }

  if ("category" in search && search.category !== undefined) {
    if (typeof search.category === "string") {
      if (search.category in BlogCategoryDescriptions) {
        appliedCategory =
          search.category as keyof typeof BlogCategoryDescriptions;
      }
    } else if (
      search.category.length !== 0 &&
      search.category[0] in BlogCategoryDescriptions
    ) {
      appliedCategory = search
        .category[0] as keyof typeof BlogCategoryDescriptions;
    }
  }

  // const sidebarInfo = await getCachedSidebarContent('blog');
  const postInfo = await getCachedRecentPosts("blog");

  const displayedPosts = postInfo.filter((val) => {
    let isCorrectCategory =
      appliedCategory === undefined ||
      val.category.toLowerCase() === appliedCategory.toLowerCase();
    let matchesTags =
      appliedTags === undefined ||
      appliedTags.every((tag) => val.tags.includes(tag));

    if (isCorrectCategory && matchesTags) {
      return true;
    }
    return false;
  });

  return (
    <div className="w-full grid grid-cols-12">
      <main className="lg:py-sm px-sm py-md mt-3xs-xl md:col-span-8 col-span-12 bg-secondary-0 dark:bg-secondary-1000 overflow-hidden rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5">
        <PageHeading
          page="blog"
          appliedCategory={appliedCategory}
          appliedTags={appliedTags}
          numResults={postInfo.length}
        />

        <Suspense fallback={<SidebarFallback page={"blog"} mini />}>
          <Sidebar page={"blog"} mini />
        </Suspense>

        {displayedPosts.length !== 0 ? (
          displayedPosts.map((value) => (
            <Suspense
              key={`blog-article-${value.slug}`}
              fallback={<ContentCardFallback />}
            >
              <ContentCard type="blog" frontmatter={value} />
            </Suspense>
          ))
        ) : (
          <span
            className={`block text-secondary-700 dark:text-secondary-400 my-6 text-center`}
          >
            No results are available for this query.{" "}
            <Link
              className={`text-primary-800 dark:text-primary-300 underline decoration-transparent hover:decoration-primary-800 dark:hover:decoration-primary-300 transition-colors duration-200`}
              href={"/blog"}
            >
              Reset filters.
            </Link>
          </span>
        )}
      </main>

      <Suspense fallback={<SidebarFallback page={"blog"} />}>
        <Sidebar page={"blog"} />
      </Suspense>
    </div>
  );
}
