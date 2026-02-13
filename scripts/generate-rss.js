const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const SITE_TITLE = 'Next.js Blog Platform';
const SITE_DESCRIPTION = 'A high-performance blog platform built with Next.js, MDX, and Tailwind CSS.';

async function generateRss() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    const posts = filenames.map((name) => {
        const filePath = path.join(postsDirectory, name);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        return {
            slug: name.replace(/\.mdx$/, ''),
            title: data.title,
            date: data.date,
            description: data.excerpt,
        };
    }).sort((a, b) => (new Date(b.date) - new Date(a.date)));

    const feedItems = posts
        .map((post) => {
            return `
    <item>
      <title>${post.title}</title>
      <link>${SITE_URL}/posts/${post.slug}</link>
      <guid>${SITE_URL}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
    </item>`;
        })
        .join('');

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${feedItems}
  </channel>
</rss>`;

    fs.writeFileSync('public/rss.xml', rss);
    console.log('RSS Feed generated!');
}

generateRss();
