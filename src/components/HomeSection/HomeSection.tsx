import { compileHomeMDX } from '@/helpers/mdx.helper';
import { compileMDX } from 'next-mdx-remote/rsc';
import { DetailedHTMLProps, HTMLAttributes, Suspense } from 'react';

type Props = {
  content: string
}

async function HomeSection(props: Props) {
  const label = props.content.split("# ")[1].split("\n")[0].toLowerCase();
  const { content, frontmatter } = await compileHomeMDX(props.content);

  if (frontmatter.published) {
    return (
      <section className="lg:py-sm px-sm py-md mt-3xs-xl col-span-12 bg-secondary-0 dark:bg-secondary-1000 overflow-hidden rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5" aria-labelledby={label}>
        {content}
      </section>
    )
  }

  return false;
}

export default HomeSection;
