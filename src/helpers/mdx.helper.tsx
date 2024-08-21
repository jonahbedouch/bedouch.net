import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { DetailedHTMLProps, DOMAttributes, HTMLAttributes, ImgHTMLAttributes, MouseEvent, MouseEventHandler } from "react";
import type { ShikiTransformer } from "@shikijs/core";

//@ts-ignore
import remarkHint from "remark-hint";
//@ts-ignore
import remarkHeadingShift from "remark-heading-shift";
import { rehypeParseBlockquotes } from "@/helpers/unified/rehype-parse-blockquotes.helper";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import RemarkFlexibleToc from "remark-flexible-toc";
import CopyButton from "@/components/CopyButton";
import { IconAlertTriangle, IconBulb, IconExclamationCircle, IconInfoCircle, IconInfoCircleFilled, IconLink, IconMessageReport } from "@tabler/icons-react";
import BoopIcon from "@/components/BoopIcon";
import { remarkAlert } from "remark-github-blockquote-alert";
import Image from "next/image";
import { rehypeImageProcess } from "./unified/rehype-image-size.helper";
import { remarkSourceRedirect } from "./unified/remark-source-redirect.helper";
import remarkUnwrapImages from "remark-unwrap-images";
import HeadingLink from "@/components/HeadingLink";

// import { h } from "hastscript";

export const SectionH1 = ({ className, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <h1 className={`sm:text-3xl text-5xl font-bold font-lato sm:text-left text-center ${className ?? ""}`} {...props}>{props.children}</h1>
)

export const SectionP = (props: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) => (
    <p className="text-base mt-xs text-justify" {...props}>{props.children}</p>
)


const H2 = (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <>
        <h2 className="flex w-full text-2xl leading-tight font-bold font-lato align-baseline sm:text-left text-center group truncate" {...props}>{props.children}</h2>
        <hr className="bg-black dark:bg-white h-0.5" />
    </>
)

const H3 = (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <h3 className="flex w-full text-2xl leading-tight font-bold font-lato sm:text-left text-center group" {...props}>{props.children}</h3>
)

const H4 = (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <h4 className="flex w-full text-xl leading-tight font-bold font-lato sm:text-left text-center group" {...props}>{props.children}</h4>
)

const H5 = (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <h5 className="flex w-full text-lg leading-tight font-bold font-lato sm:text-left text-center group" {...props}>{props.children}</h5>
)

const H6 = (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <h6 className="flex w-full text-base leading-tight font-bold font-lato sm:text-left text-center group" {...props}>{props.children}</h6>
)

const A = ({ className, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
    if ('data-heading-link' in props) {
        //@ts-ignore
        return <HeadingLink className={`group-hover:opacity-100 opacity-0 max-h-full text-primary-800 dark:text-primary-300 underline decoration-transparent hover:decoration-primary-800 dark:hover:decoration-primary-300 transition-colors transition-opacity duration-200 ${className ?? ""}`}  {...props}></HeadingLink>
    }

    //@ts-ignore
    return <Link className={`text-primary-800 dark:text-primary-300 underline decoration-transparent hover:decoration-primary-800 dark:hover:decoration-primary-300 transition-colors duration-200 ${className ?? ""}`} {...props}></Link>
}

const Figure = (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
    if ('data-rehype-pretty-code-figure' in props) {
        return <figure className="relative bg-codeblock-bg-light dark:bg-codeblock-bg-dark rounded-lg px-3 py-2 my-2 border border-secondary-1000 dark:border-secondary-700 border-opacity-5" {...props}></figure>
    } if ('data-blockquote' in props) {
        return <figure className="border-l-[6px] my-2 border-secondary-400 dark:border-secondary-600 pl-4 py-2 bg-secondary-200 base:dark:bg-secondary-600 dark:bg-secondary-900 bg-opacity-30 dark:bg-opacity-30 base:dark:bg-opacity-30" {...props}></figure>
    } else {
        return <figure {...props}></figure>
    }
}


const Figcaption = (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
    if ('data-rehype-pretty-code-title' in props) {
        return <figcaption className="flex items-center align-middle justify-center font-semibold font-lato" {...props}></figcaption>
    } else if ('data-blockquote-citation' in props) {

        return <figcaption className="text-lg before:inline before:content-['—'] before:mr-2" {...props}></figcaption>
    } else {
        return <figcaption {...props}></figcaption>
    }
}

const Span = (props: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>) => {
    if ('data-language-tag' in props) {
        return <span {...props}></span>
    } else if ('data-rehype-pretty-code-figure' in props) {
        return <span className="group bg-codeblock-bg-light dark:bg-codeblock-bg-dark px-1 py-0.5 rounded-md border border-secondary-1000 dark:border-secondary-700 border-opacity-50" data-inline {...props}></span>
    } else if ('data-highlighted-line' in props) {
        return <span className="!bg-zinc-900 my-px dark:!bg-zinc-100 !bg-opacity-5 dark:!bg-opacity-10 rounded-md" {...props}></span>
    } else if ('data-line' in props) {
        return <span className="my-px" {...props}></span>
    } else if (props.className !== undefined && props.className.includes('icon') && props.className.includes('icon-link')) {
        return <IconLink width={1} height={1} className="h-full w-auto p-1" />
    } else {
        return <span {...props}></span>
    }
}

const Mark = (props: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>) => {
    return <mark className="px-1 py-0.5 !bg-zinc-600 my-px dark:!bg-zinc-100 !bg-opacity-10 dark:!bg-opacity-10 rounded-md" {...props}></mark>
}

const Button = (props: DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    if ('data-copy-btn' in props) {
        return <CopyButton className="absolute top-2 right-2 group-data-[inline]:w-0 group-data-[inline]:h-0 group-data-[inline]:hidden group-data-[inline]:invisible" {...props} aria-label="copy code block content" />
    }
    else {
        return <button {...props}></button>
    }
}

const Ul = (props: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
    <ul className="list-disc list-inside" {...props}></ul>
)

const Ol = (props: DetailedHTMLProps<HTMLAttributes<HTMLOListElement>, HTMLOListElement>) => (
    <ol className="list-decimal list-inside" {...props}></ol>
)

const Div = ({ className, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    if (className !== undefined && className.includes('markdown-alert')) {

        return <figure className={`border-l-[6px] my-2 pl-4 py-2 ${className}`} {...props}></figure>
    } else {
        return <div className={className} {...props}></div>
    }
}

const Img = ({ className, title, ...props }: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
    if (title) {
        return (
            <figure className="my-5">
                {/* @ts-ignore - technically the props don't line up but oops they actually do */}
                <Image className={`max-w-[85%] max-h-[40rem] h-auto w-auto mx-auto rounded-xl border border-secondary-1000 dark:border-secondary-0 shadow-medium dark:shadow-d-medium ${className ?? ""}`} {...props} placeholder={"blur"} />
                <figcaption className="text-center text-secondary-800 dark:text-secondary-300 mt-2">{title}</figcaption>
            </figure>
        )
    } else {
        {/* @ts-ignore - technically the props don't line up but oops they actually do */ }
        < Image className={`max-w-[85%] max-h-[40rem] h-auto w-auto mx-auto rounded-xl border border-secondary-1000 dark:border-secondary-0 shadow-medium dark:shadow-d-medium ${className ?? ""}`} {...props} placeholder={"blur"} />
    }
}

const Transformer: ShikiTransformer = {
    name: "Codeblock Copy",
    code(node) {
        // if (this.options.structure == 'inline') { return; }
        node.children.push({
            type: "element",
            tagName: "button",
            properties: {
                type: "button",
                data: this.source,
                title: "Copy code",
                'aria-label': "copy code",
                'data-copy-btn': ''
            },
            children: []
        })
    },
    // line(hast, line) {
    //     console.log(this.options)
    //     console.log(hast)
    //     console.log(line)
    // },
}

const PrettyCodeOptions: Options = {
    keepBackground: false,
    defaultLang: "plaintext",
    theme: {
        'light': 'github-light-default',
        'dark': 'github-dark-default',
        'america': 'github-light-default',
        'america-dark': 'github-dark-default'
    },
    transformers: [Transformer],
}

export const MarkdownComponents = { h2: H2, h3: H3, h4: H4, h5: H5, h6: H6, a: A, ul: Ul, ol: Ol, figure: Figure, figcaption: Figcaption, button: Button, span: Span, mark: Mark, div: Div, img: Img }

export async function compilePageMdx<TFrontmatter = Record<string, unknown>>(contentStr: string, rootDir: string) {
    const toc: { value: string, href: string, depth: number, numbering: number[], parent: string }[] = []

    let result = await compileMDX<TFrontmatter>({
        source: contentStr, options: {
            mdxOptions: {
                remarkPlugins: [
                    remarkHeadingShift,
                    remarkUnwrapImages,
                    [remarkAlert, { legacyTitle: true }],
                    [RemarkFlexibleToc, { tocRef: toc }],
                    [remarkSourceRedirect, { root: rootDir }]

                ],
                rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "append", properties: { ariaHidden: true, tabIndex: -1, 'data-heading-link': '' } }],
                    [rehypePrettyCode, PrettyCodeOptions],
                    rehypeParseBlockquotes,
                    [rehypeImageProcess, { root: './public' }]
                ]
            },
            parseFrontmatter: true,
        },
        components: MarkdownComponents
    })

    return { toc, ...result }

}