import { CategoryDescriptions } from '@/helpers/frontmatter.helper';
import { SectionH1 } from '@/helpers/mdx.helper';
import * as React from 'react';
import UnfilterLink from './UnfilterLink';

type Props = {
  appliedCategory: keyof typeof CategoryDescriptions | undefined;
  appliedTags: string[] | undefined;
  page: 'blog' | 'projects';
}

function PageHeading(props: Props) {
  return <>
    <SectionH1>
      Recent Posts {props.appliedCategory ? `in ${props.appliedCategory}` : ``}
    </SectionH1>
    <p className='mt-2'>{props.appliedCategory && props.appliedCategory in CategoryDescriptions ? CategoryDescriptions[props.appliedCategory] : "Some blurb about my blog"}</p>
    {props.appliedTags ? <p className="m-0 p-0 italic text-sm text-secondary-800 dark:text-secondary-400">
      Filtering by {props.appliedTags.map((val, i) => [i > 0 && ", ", <UnfilterLink key={`${props.page}-unlink-tag-${val}`} page={props.page} tagName={val} />])}
    </p> : <></>}
  </>;
}

export default PageHeading;
