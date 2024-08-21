import { SectionH1, SectionP } from '@/helpers/mdx.helper';
import { compileMDX } from 'next-mdx-remote/rsc';
import { DetailedHTMLProps, HTMLAttributes, Suspense } from 'react';

type Props = {
  content: string
}

async function HomeSection(props: Props) {
  const { content, frontmatter } = await compileMDX<{ title: string, published: boolean, lastUpdated: string }>({ source: props.content, components: { p: SectionP, h1: SectionH1 }, options: { parseFrontmatter: true } })

  if (frontmatter.published) {
    return (
      <section className="lg:py-sm px-sm py-md mt-3xs-xl col-span-12 bg-secondary-0 dark:bg-secondary-1000 overflow-hidden rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5" aria-labelledby={`section-${frontmatter.title}`}>
        <Suspense fallback={<>Loading ...</>}>
          <SectionH1 id={`section-${frontmatter.title}`}>{frontmatter.title}</SectionH1>
          {content}
        </Suspense>
      </section>
    )
  }

  return false;
}

export default HomeSection;
