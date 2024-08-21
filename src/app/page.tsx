import HomeSection from "@/components/HomeSection";
import { cachedReadFile } from "@/helpers/frontmatter.helper";
import Hero from "@components/Hero";
import { promises as fs } from 'fs';

export const metadata = {
  title: 'Jonah Bedouch | Home',
  description: '',
}

export default async function Page() {
  const sections = await fs.readdir(process.cwd() + "/content/home/");

  const sectionContent: Record<string, string> = {}
  for (const section of sections) {
    sectionContent[section] = await cachedReadFile(process.cwd() + '/content/home/' + section, 'utf-8');
  }

  return (<main className="w-full grid grid-cols-12 md:gap-x-3xs-xl pt-3xs-xl">
    <Hero />
    {sections.map((section) => {
      if (section !== 'hero.mdx') {
        return (<HomeSection content={sectionContent[section]} key={'homecontent-' + section} />)
      }
    })}
  </main>)
}
