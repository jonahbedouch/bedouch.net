import Category from "@/components/Category";
import ContentCard from "@/components/ContentCard";
import HomeSection from "@/components/HomeSection";
import PageHeading from "@/components/PageHeading";
import Tag from "@/components/Tag";
import { ProjectCategoryDescriptions, getCachedRecentPosts, getCachedSidebarContent } from "@/helpers/frontmatter.helper";
import Link from "next/link";
import { Suspense } from "react";

export default async function Projects({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  console.log(searchParams)
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

  const sidebarInfo = await getCachedSidebarContent('projects');
  const postInfo = await getCachedRecentPosts('projects', appliedCategory, appliedTags);

  return (
    <div className="w-full grid grid-cols-12">
      <main className="lg:py-sm px-sm py-md mt-3xs-xl md:col-span-8 col-span-12 bg-secondary-0 dark:bg-secondary-1000 overflow-hidden rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5">
        <PageHeading page="projects" appliedCategory={appliedCategory} appliedTags={appliedTags} />

        <aside className="mt-4 md:hidden md:invisible visible grid grid-cols-2 h-min rounded-lg border-2 p-2 border-secondary-1000 dark:border-secondary-900 ring-opacity-5" aria-label="filter results">
          <div className="">
            <span className="my-1 font-semibold font-lato">Categories</span>
            <div className="flex flex-row flex-wrap">
              <Suspense fallback={<>Loading...</>}>
                {sidebarInfo.categories.map(val => (<Category key={`main-projects-category-${val}`} page="projects" category={val} className="mr-2 mb-2" />))}
              </Suspense>
            </div>
          </div>

          <div className="">
            <span className="my-1 font-semibold font-lato">Top Tags</span>
            <div className="flex flex-row flex-wrap">
              <Suspense fallback={<>Loading...</>}>
                {sidebarInfo.tags.map(val => (<Tag key={`main-projects-tag-${val}`} page="projects" tagName={val} main className="mr-2 mb-2" />))}
              </Suspense>
            </div>
          </div>
        </aside>

        {
          postInfo.map(value => <ContentCard key={`project-${value.slug}`} type="project" frontmatter={value} />)
        }

      </main>

      <aside className="md:flex hidden mt-3xs-xl ml-sm col-span-4 sticky top-10 flex-col h-min lg:py-sm px-sm py-md bg-secondary-0 dark:bg-secondary-1000 rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5" aria-label="filter results">
        <span className="my-1 font-semibold font-lato">Categories</span>
        <div className="flex flex-row flex-wrap">
          <Suspense fallback={<>Loading...</>}>
            {sidebarInfo.categories.map(val => (<Category key={`main-project-category-${val}`} page="projects" category={val} className="mr-2 mb-2" />))}
          </Suspense>
        </div>

        <span className="my-1 font-semibold font-lato">Top Tags</span>
        <div className="flex flex-row flex-wrap">
          <Suspense fallback={<>Loading...</>}>
            {sidebarInfo.tags.map(val => (<Tag key={`main-project-tag-${val}`} page="projects" tagName={val} main className="mr-2 mb-2" />))}
          </Suspense>
        </div>

        <span className="my-1 font-semibold font-lato">Featured Projects</span>
        <Suspense fallback={<>Loading...</>}>
          {sidebarInfo.featured.map(val => (
            <Link key={`main-project-featured-${val.slug}`} href={`/projects/${val.slug}`} className="text-primary-800 dark:text-primary-300 underline decoration-transparent hover:decoration-primary-800 dark:hover:decoration-primary-300 transition-colors duration-200">{val.title}</Link>
          ))}
        </Suspense>
      </aside>
    </div>
  )
}
