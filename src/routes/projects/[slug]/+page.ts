import { error } from "@sveltejs/kit";
import type { PageLoad } from "../$types"

export const load: PageLoad = async ({ params }) => {
    try {
        if (!('slug' in params)) {
            throw TypeError();
        }
        else {
            const post = await import(`/static/content/projects/${params.slug}/index.mdx`);
            const { title, date, featureImage, excerpt } = post.metadata;
            const content = post.default;
        
            return {
                content,
                title,
                date,
                featureImage,
                excerpt,
                slug: params.slug
            };
        }
    }
    catch {
        throw error(404, 'Page not found')
    }
}