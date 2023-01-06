import { error } from "@sveltejs/kit"
import type { PageLoad } from "../$types"

export const load: PageLoad = async ({ params }) => {
    try {
        if (!('slug' in params) || typeof params.slug != "string") {
            throw TypeError();
        }
        else {
            const post = await import(`/content/blog/${params.slug}/index.svx`);
            const { title, date } = post.metadata;
            const content = post.default;
        
            return {
                content,
                title,
                date,
            };
    
        }
    }
    catch {
        throw error(404, 'Page not found');
    }
}