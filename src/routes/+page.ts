import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch, url }) => {
    const postsResponse = await fetch(`/api/posts`)
    const projectsResponse = await fetch(`/api/projects`)
    const posts: Array<Record<string, any>> = await postsResponse.json()
    const projects: Array<Record<string, any>> = await projectsResponse.json()

    const featuredPosts = posts.filter((post) => { return post.meta.featured == true })
    const featuredProjects = projects.filter((project) => { return project.meta.featured == true })
    
    return {
        featuredPosts,
        featuredProjects
    }
}