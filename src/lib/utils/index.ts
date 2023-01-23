import Adjust from "$lib/icons/Adjust.svelte"
import Desktop from "$lib/icons/Desktop.svelte"
import Moon from "$lib/icons/Moon.svelte"
import Sun from "$lib/icons/Sun.svelte"
import type { ThemeOptions } from "$lib/shared/stores/theme"
import { error } from "@sveltejs/kit"
import type { HtmlElementNode } from "rehype-toc"

const fetchMarkdownPosts = async (allPostFiles: Record<string, () => Promise<unknown>>) => {
    
    const iterablePostFiles = Object.entries(allPostFiles as Record<string, () => Promise<Record<string, Record<string, string>>>>)

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const { metadata } = await resolver()
            const postPath = path.slice(13,-10)


            return {
                meta: metadata,
                path: postPath,
            }
        })
    )

    return allPosts
}

export const fetchBlogPosts = async () => {
    return await fetchMarkdownPosts(import.meta.glob('/src/content/blog/**/index.svx'))
}

export const fetchProjects = async () => {
    return await fetchMarkdownPosts(import.meta.glob('/src/content/projects/**/index.svx'))
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

const getSeason = () => {
    let now = new Date();
    let month = now.getMonth();
    let day = now.getDate();
    let str: string | null = null;
    switch (month) {
        case 2:
            if (day == 14) {
                str = 'valentines'
            }
            break;
        case 3:
            if (day == 17) {
                str = 'stpatricks'
            }
            break;
        case 9:
            str = 'autumn'
            break;
        case 10:
            if (day > 28) {
                str = 'halloween'
            }
            else {
                str = 'autumn'
            }
            break;
        case 11:
            if (day < 3) {
                str = 'halloween'
            }
            else {
                str = 'autumn'
            }
            break;
        case 12:
            'winter'
            break;
    }

    return str;
}

export const getThemeFile = (themeConfig: ThemeOptions) => {
    let base = `/css/themes/${themeConfig.color}`


    if (themeConfig.highContrast) {
        base += '_hc'
    }
    else if (themeConfig.seasonal) {
        let season = getSeason();
        if (season) {
            base += `_${season}`;
        }
    }

    return `${base}.css`
}

export const getThemeName = (themeConfig: ThemeOptions) => {
    let base = `${themeConfig.color.charAt(0).toUpperCase()}${themeConfig.color.slice(1)}`
    if (themeConfig.highContrast) {
        base += ' High Contrast'
    }
    else if (themeConfig.seasonal) {
        let season = getSeason();
        if (season) {
            base += ` ${season.charAt(0).toUpperCase()}${season.slice(1)}`;
        }
    }
    return base
}

export const getIcon = (theme: ThemeOptions) => {
    const curTheme = getThemeFile(theme);
    
    switch (curTheme) {
        case "/css/themes/dark.css":
            return Moon;
        case "/css/themes/light.css":
            return Sun;
        case "/css/themes/system.css":
            return Desktop;
        case "/css/themes/dark_hc.css":
            return Adjust;
        case "/css/themes/light_hc.css":
            return Adjust;
        case "/css/themes/system_hc.css":
            return Adjust;
    }
}