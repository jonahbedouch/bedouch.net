import Image from "next/image"
import Socials from "./Socials"
import avatar from "./avatar.png"
import { DetailedHTMLProps, HTMLAttributes, Suspense } from "react"
import { Boop } from "@components/Boop"
import { MDXRemote } from "next-mdx-remote/rsc"
import { promises as fs } from 'fs'
import { cachedReadFile } from "@/helpers/frontmatter.helper"

const HeroH1 = (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <h1 className="text-5xl font-bold font-lato sm:text-left text-center" {...props}>{props.children}</h1>
)

const HeroP = (props: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) => (
    <p className="text-base mt-xs-sm text-justify" {...props}>{props.children}</p>
)

async function Hero() {
    const content = await cachedReadFile(process.cwd() + '/content/home/01_hero.mdx', 'utf-8');

    return (
        <>
            <div className="md:col-span-3 col-span-12 md:m-0 mb-md md:w-auto mx-auto md:h-auto h-1/4">
                <div className="md:w-auto sm:w-80 w-4/6 sm:h-auto mx-auto">
                    <Image priority={true} src={avatar} alt='A picture of me' className='rounded-lg overflow-hidden shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5' />
                </div>
            </div>
            <section className="lg:py-sm px-sm py-md md:col-span-9 col-span-12 bg-secondary-0 dark:bg-secondary-1000 overflow-hidden rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5" role="region" aria-label="welcome hero">
                <Suspense fallback={<>Loading ...</>}>
                    <MDXRemote source={content} components={{ h1: HeroH1, p: HeroP, Boop: Boop, Socials: Socials }} />
                </Suspense>
            </section>
        </>
    )
}

export default Hero;
