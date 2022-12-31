import { fetchBlogPosts, getMetaType } from '$lib/utils'
import { json } from '@sveltejs/kit'

export const GET = async () => {
  try {
    const allPosts = await fetchBlogPosts()
    
    const tags = getMetaType(allPosts, 'tags');

    return json({tags})
  }
  catch {
    return {}
  }
}