import PageHeading from "@/components/PageHeading";
import { SidebarFallback } from "@/components/Sidebar";

export default async function Loading() {

    return (
        <div className="w-full grid grid-cols-12">
            <main className="lg:py-sm px-sm py-md mt-3xs-xl md:col-span-8 col-span-12 bg-secondary-0 dark:bg-secondary-1000 overflow-hidden rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5">
                <PageHeading page="blog" appliedCategory={undefined} appliedTags={undefined} />

                <SidebarFallback page={"blog"} mini />

            </main>

            <SidebarFallback page={"blog"} />
        </div>
    )
}

