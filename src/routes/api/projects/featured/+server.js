import { fetchProjects } from '$lib/utils'
import { json } from '@sveltejs/kit'

export const GET = async () => {
  const allPosts = await fetchProjects()

  const sortedProjects = allPosts.sort((a, b) => {
    return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  })

  const filteredProjects = sortedProjects.filter((project) => {
    return project.meta.featured ?? false;
  })

  return json(filteredProjects)
}