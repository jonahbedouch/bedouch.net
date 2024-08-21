'use client'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

type Props = {
  page: 'blog' | 'projects';
  tagName: string;
  className?: string;
  main?: boolean
}

function Tag(props: Props) {
  const params = useSearchParams();
  const mutableParams = new URLSearchParams(params.toString());
  const inParams = mutableParams.getAll('filter').includes(props.tagName);
  if (inParams) {
    mutableParams.delete('filter', props.tagName);
  } else {
    mutableParams.append('filter', props.tagName);
  }

  return <Link aria-label={props.main ? inParams ? 'stop filtering by tag' : 'filter by tag' : 'jump to posts with tag'} href={{ pathname: `/${props.page}`, query: mutableParams.toString() }} className={`min-w-max py-0.5 px-1 hover:shadow-md shadow-sm rounded-md ${inParams ? 'bg-primary-200 hover:bg-primary-300 dark:bg-primary-800 dark:hover:bg-primary-900' : 'bg-secondary-100 dark:bg-secondary-800 hover:bg-primary-200 dark:hover:bg-primary-800'} ${props.className ?? ''} `}>
    {props.tagName}
  </Link>;
}

export default Tag;
