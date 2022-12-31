import { error } from "@sveltejs/kit"

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

export const getMetaType = (data: Array<{'path': string, 'meta': Record<string, string>}>, metaType: string, required = true) => {
    let result: Record<string, number> = {}
    for (let i = 0; i < data.length; i++) {
        if (metaType in data[i].meta) {
            for (let u = 0; u < data[i].meta[metaType].length; u++) {
                if (data[i].meta[metaType][u] in result) {
                    result[data[i].meta[metaType][u]] += 1
                }
                else {
                    result[data[i].meta[metaType][u]] = 1
                }
            }
        }
        else {
            if (required == true) {
                throw error(500, 'Internal Server Error - Malformed Metadata')
            }
            else {
                continue;
            }
        }
    }

    return result
}