const fetchMarkdownPosts = async (allPostFiles: Record<string, () => Promise<unknown>>) => {
    
    const iterablePostFiles = Object.entries(allPostFiles as Record<string, () => Promise<Record<string, Record<string, string>>>>)

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const { metadata } = await resolver()
            const postPath = path.slice(11, -3)

            return {
                meta: metadata,
                path: postPath,
            }
        })
    )

    return allPosts
}

export const fetchBlogPosts = async () => {
    return await fetchMarkdownPosts(import.meta.glob('/src/routes/blog/*.md'))
}

export const fetchProjects = async () => {
    return await fetchMarkdownPosts(import.meta.glob('/src/routes/projects/*.md'))
}