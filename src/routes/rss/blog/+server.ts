import { fetchBlogPosts } from '$lib/utils'

const siteURL = 'https://bedouch.net/'
const siteTitle = 'Jonah Bedouch\'s Website'
const siteDescription = 'idk bruh'

export const prerender = true
  
export const GET = async () => {
  const allPosts = await fetchBlogPosts()
  const sortedPosts = allPosts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())

  const body = render(sortedPosts)
  const options = {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'application/xml',
    }
  };

  return new Response(
    body,
    options
  )
}

const render = (posts: Array<{path: string, meta: Record<string, string>}>) =>
(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${siteTitle}</title>
<description>${siteDescription}</description>
<link>${siteURL}</link>
<atom:link href="${siteURL}rss/blog.xml" rel="self" type="application/rss+xml"/>
${posts
  .map(
    (post) => `<item>
<guid isPermaLink="true">${siteURL}${post.path}</guid>
<title>${post.meta.title}</title>
<link>${siteURL}${post.path}</link>
<description>${post.meta.title}</description>
<pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
</item>`
  )
  .join('')}
</channel>
</rss>
`)