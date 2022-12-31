export async function load({ params }: Record<string, Record<string, string>>): Promise<Record<string, string>> {
    const post = await import(`../${params.slug}.md`)
    const { title, date } = post.metadata
    const content = post.default

    return {
        content,
        title,
        date,
    }
}