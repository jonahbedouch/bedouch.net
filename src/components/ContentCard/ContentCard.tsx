import { BlogFrontmatter, ProjectFrontmatter } from '@/helpers/frontmatter.helper';
import Image from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';
import * as fs from "fs/promises";
import { IconArrowUpRight } from '@tabler/icons-react';

type Props = {
  type: 'blog' | 'project';
  frontmatter: ProjectFrontmatter | BlogFrontmatter;
}

async function ContentCard(props: Props) {

  const pubdate = new Date(props.frontmatter.publishDate);
  let placeholder;
  if (props.frontmatter.thumbnail !== undefined) {
    const file = await fs.readFile(`./public/${props.type}-assets/${props.frontmatter.slug}/${props.frontmatter.thumbnail}`)
    const { base64 } = await getPlaiceholder(file);
    placeholder = base64;
  }

  const path = props.type === 'project' ? 'projects' : 'blog'

  return <article className=''>
    <Link href={`/${path}/${props.frontmatter.slug}`} className='rounded-lg bg-secondary-100 hover:bg-secondary-0 dark:base:bg-secondary-900 dark:bg-secondary-950 dark:base:hover:bg-secondary-1000 dark:hover:bg-secondary-1000 border border-secondary-700 dark:border-secondary-500 my-2 lg:pl-2 p-1 group flex flex-row relative h-40 w-full hover:shadow-low dark:hover:shadow-d-low transition-all duration-200'>
      <div className="flex-col flex-grow w-1">
        <span className='line-clamp-1 text-secondary-700 dark:text-secondary-400 group-hover:text-primary-800 dark:group-hover:text-primary-300'>
          <span className='font-medium sm:mr-0 mr-auto'><span className="sr-only">Category: </span>{props.frontmatter.category}</span>
          {props.frontmatter.tags.length !== 0 ?
            [<span key={`${props.frontmatter.slug}-bar`} className='mx-1 font-medium' aria-hidden>|</span>, <span key={`${props.frontmatter.slug}-tags`}><span className='sr-only'>Tags: </span>{props.frontmatter.tags.join(" · ")}</span>]
            : <></>}
        </span>
        <h2 className='text-xl font-medium font-lato leading-tight'>{props.frontmatter.title}</h2>
        <span className='text-secondary-700 dark:text-secondary-400'><span className='sr-only'>Published on: </span>{pubdate.toLocaleDateString('en-US', { month: "long", day: "numeric", year: "numeric" })}</span>

        <p className="mt-1 line-clamp-2 w-full leading-tight">
          {props.frontmatter.excerpt}
        </p>
        <span className='absolute flex lg:left-2 left-1 bottom-1 text-primary-800 dark:text-primary-300 group-hover:font-medium underline decoration-transparent group-hover:decoration-primary-800 dark:group-hover:decoration-primary-300 transition-all duration-200'>Read More <span className='relative overflow-hidden inline-block after:content-["\00A0"] after:absolute after:right-0 after:left-0 after:bottom-0 after:top-0 after:underline after:tracking-[1000px] after:decoration-transparent after:group-hover:decoration-primary-800 after:dark:group-hover:decoration-primary-300 after:transition-colors after:duration-200' aria-hidden ><IconArrowUpRight width={24} height={24} focusable={false} className='stroke-1 group-hover:stroke-[1.5] transition-all duration-200' /></span></span>
      </div>
      {props.frontmatter.thumbnail !== undefined ?
        <Image alt="" className='aspect-square object-cover grayscale-[25%] dark:grayscale-[35%] group-hover:grayscale-0 rounded-md sm:h-[9.4rem] sm:w-[9.4rem] ml-2  sm:block hidden' width={256} height={256} src={`/blog-assets/${props.frontmatter.slug}/${props.frontmatter.thumbnail}`} placeholder='blur' blurDataURL={placeholder}></Image> :
        <></>
      }
    </Link>
  </article >;
}

export default ContentCard;
