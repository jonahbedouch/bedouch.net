import type { PageLoad } from "./blog/$types"

export const load: PageLoad = ({ url }) => {
    const currentRoute = url.pathname;

    return {
        currentRoute
    }
}