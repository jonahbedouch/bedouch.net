import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import * as fs from "fs";
import * as React from 'react';

type TProps = {
  children: React.ReactElement
}

export function Timeline(props: TProps) {
  return (
    <div className='relative py-4 my-2 after:content-[""] after:absolute after:w-1.5 after:rounded-full after:ml-6 after:top-0 after:bottom-0 after:left-2 after:bg-secondary-800 dark:after:bg-secondary-0'>
      {/* <div className="ml-12 h-40">test</div> */}
      {props.children}
    </div>
  );
}

type TEProps = {
  imgSrc: string;
  company: string;
  title: string;
  subtitle: string;
  children: React.ReactElement;
}

export async function TimelineEntry(props: TEProps) {

  let file = fs.readFileSync("./public/assets/" + props.imgSrc);

  let { base64 } = await getPlaiceholder(file, { size: 4 });

  return (
    <div role="region" aria-label={`description of position at ${props.company}`} className={`ml-24 my-4 relative text-justify`} key={`${props.company}-${props.title}`}>
      <Image src={`/assets/${props.imgSrc}`} width={1024} height={1024} alt={`${props.company} logo.`} className={`absolute left-[-5.8rem] top-0.5 z-10 rounded-md border-4 border-secondary-800 dark:border-secondary-0 object-contain w-16 h-16`} placeholder='blur' blurDataURL={base64} />
      <h2 className={`text-xl leading-tight font-lato`}>{props.title}</h2>
      <h3 className={`text-secondary-700 font-medium dark:text-secondary-400`}>{props.company}<span aria-hidden={true}> · </span>{props.subtitle}</h3>
      {props.children}
    </div>
  )
}

