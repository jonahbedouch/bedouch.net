import HomeSection from "@/components/HomeSection";
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
    sectionContent[section] = await fs.readFile(process.cwd() + '/content/home/' + section, 'utf-8');
  }

  return (<>
    <Hero  />
    {sections.map((section) => {
      if (section !== 'hero.mdx') {
        return (<HomeSection content={sectionContent[section]} key={'homecontent-' + section} />)
      }
    })}
  </>)
}
