const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

async function generateSitemap() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    const posts = filenames.map((name) => {
        const filePath = path.join(postsDirectory, name);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        return {
            slug: name.replace(/\.mdx$/, ''),
            date: data.date,
        };
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/blog</loc>
       <changefreq>daily</changefreq>
       <priority>0.9</priority>
     </url>
     ${posts
            .map(({ slug, date }) => {
                return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/posts/${slug}`}</loc>
           <lastmod>${date}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.7</priority>
       </url>
     `;
            })
            .join('')}
   </urlset>
 `;

    fs.writeFileSync('public/sitemap.xml', sitemap);
    console.log('Sitemap generated!');
}

generateSitemap();
