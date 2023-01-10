import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch, url }) => {
    const response = await fetch(`/api/posts`)
    const posts: Array<Record<string, any>> = await response.json()
    const filter = url.searchParams.get('filter') || '*';

    return {
        posts,
        filter
    }
}