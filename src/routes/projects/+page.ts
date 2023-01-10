import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch, url }) => {
    const response = await fetch(`/api/projects`)
    const projects = await response.json()
    const filter = url.searchParams.get('filter') || '*';

    return {
        projects,
        filter
    }
}