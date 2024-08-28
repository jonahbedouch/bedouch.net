import HomeSection from "@/components/HomeSection";
import { cachedReadFile } from "@/helpers/frontmatter.helper";
import Hero from "@components/Hero";
import { promises as fs } from 'fs';
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://bedouch.net"),
  title: "Home",
  description: "Hi! I'm Jonah Bedouch. I'm a student at UC Berkeley who is interested in multidisciplinary applicationos of computer science, cybersecurity, pedagogy, and transit! Welcome to my little corner of the internet.",
  generator: "Next.js",
  keywords: ['frontend', 'react', 'computer science', 'student', 'berkeley', 'eecs'],
  authors: [{ name: "Jonah Bedouch" }],
  openGraph: {
    title: "Jonah Bedouch",
    description: "Hi! I'm Jonah Bedouch. I'm a student at UC Berkeley who is interested in multidisciplinary applicationos of computer science, cybersecurity, pedagogy, and transit! Welcome to my little corner of the internet.",
    url: `https://bedouch.net`,
    siteName: "Jonah Bedouch",
    locale: "en-US",
    type: "website",
    images: [{ url: "/avatar.png", alt: "Jonah's headshot" }]
  },
  twitter: {
    card: "summary",
    title: `Jonah Bedouch`,
    description: "Hi! I'm Jonah Bedouch. I'm a student at UC Berkeley who is interested in multidisciplinary applicationos of computer science, cybersecurity, pedagogy, and transit! Welcome to my little corner of the internet.",
    creator: "@jonahbedouch",
    images: ["/avatar.png"]
  }
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
