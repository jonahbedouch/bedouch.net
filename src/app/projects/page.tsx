import Category from "@/components/Category";
import ContentCard, { ContentCardFallback } from "@/components/ContentCard";
import HomeSection from "@/components/HomeSection";
import PageHeading from "@/components/PageHeading";
import Tag from "@/components/Tag";
import { getCachedRecentPosts, getCachedSidebarContent } from "@/helpers/frontmatter.helper";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProjectCategoryDescriptions, ProjectDesc } from "../../../content/categories";
import Sidebar, { SidebarFallback } from "@/components/Sidebar";

export const metadata: Metadata = {
  metadataBase: new URL("https://bedouch.net"),
  title: "Projects",
  description: "",
  generator: "Next.js",
  keywords: ['projects', 'frontend', 'react', 'computer science', 'student'],
  authors: [{ name: "Jonah Bedouch" }],
  openGraph: {
    title: "Projects | Jonah Bedouch",
    description: ProjectDesc,
    url: `https://bedouch.net/projects`,
    siteName: "Jonah Bedouch",
    locale: "en-US",
    type: "website",
    images: [{ url: "/avatar.png", alt: "Jonah's headshot" }]
  },
  twitter: {
    card: "summary",
    title: `Projects | Jonah Bedouch`,
    description: ProjectDesc,
    creator: "@jonahbedouch",
    images: ["/avatar.png"]
  }
}

export default async function Projects({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  let appliedTags: string[] | undefined = undefined;
  let appliedCategory: keyof typeof ProjectCategoryDescriptions | undefined = undefined;
  if ('filter' in searchParams && searchParams.filter !== undefined) {
    if (typeof searchParams.filter === 'string') {
      appliedTags = [searchParams.filter];
    } else {
      appliedTags = searchParams.filter
    }
  }

  if ('category' in searchParams && searchParams.category !== undefined) {
    if (typeof searchParams.category === 'string') {
      if (searchParams.category in ProjectCategoryDescriptions) {
        appliedCategory = searchParams.category as keyof typeof ProjectCategoryDescriptions;
      }
    } else if (searchParams.category.length !== 0 && searchParams.category[0] in ProjectCategoryDescriptions) {
      appliedCategory = searchParams.category[0] as keyof typeof ProjectCategoryDescriptions;
    }
  }

  const postInfo = await getCachedRecentPosts('projects');
  const displayedPosts = postInfo.filter((val) => {
    let isCorrectCategory = appliedCategory === undefined || val.category.toLowerCase() === appliedCategory.toLowerCase();
    let matchesTags = appliedTags === undefined || appliedTags.every(tag => (val.tags.includes(tag)))

    if (isCorrectCategory && matchesTags) {
      return true;
    }
    return false;
  })

  return (
    <div className="w-full grid grid-cols-12">
      <main className="lg:py-sm px-sm py-md mt-3xs-xl md:col-span-8 col-span-12 bg-secondary-0 dark:bg-secondary-1000 overflow-hidden rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5">
        <PageHeading page="projects" appliedCategory={appliedCategory} appliedTags={appliedTags} numResults={postInfo.length} />

        <Suspense fallback={<SidebarFallback page={"projects"} mini />}>
          <Sidebar page={"projects"} mini />
        </Suspense>

        {
          displayedPosts.length !== 0 ? displayedPosts.map(value => <Suspense key={`project-${value.slug}`} fallback={<ContentCardFallback />} ><ContentCard type="project" frontmatter={value} /></Suspense>) : <span className={`block text-secondary-700 dark:text-secondary-400 my-6 mx-auto`}>No results are available. <Link className={`text-primary-800 dark:text-primary-300 underline decoration-transparent hover:decoration-primary-800 dark:hover:decoration-primary-300 transition-colors duration-200`} href={'/projects'}>Reset filters.</Link></span>
        }

      </main>

      <Suspense fallback={<SidebarFallback page={"projects"} />}>
        <Sidebar page={"projects"} />
      </Suspense>
    </div>
  )
}
