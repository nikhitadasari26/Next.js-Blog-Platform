import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { generateNextSeo } from 'next-seo/pages';
import readingTime from 'reading-time';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import MDXComponents from '@/components/MDXComponents';
import Header from '@/components/Header';
import Head from 'next/head';

export default function Post({ source, frontMatter, readingTimeStats }) {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <Head>
                {generateNextSeo({
                    title: frontMatter.title,
                    description: frontMatter.excerpt,
                    openGraph: {
                        title: frontMatter.title,
                        description: frontMatter.excerpt,
                        type: 'article',
                        article: {
                            publishedTime: frontMatter.date,
                            authors: [frontMatter.author || 'Author'],
                            tags: frontMatter.tags || [],
                        },
                    },
                    twitter: {
                        cardType: 'summary_large_image',
                    }
                })}
            </Head>

            <main className="container mx-auto px-4 py-8 max-w-4xl" data-testid="blog-post">

                <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                    <header className="mb-8 not-prose">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4" data-testid="post-title">
                            {frontMatter.title}
                        </h1>
                        <div className="flex items-center text-gray-600 dark:text-gray-400 space-x-4">
                            <time dateTime={frontMatter.date}>
                                {new Date(frontMatter.date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                            <span>•</span>
                            <span data-testid="reading-time">{readingTimeStats.text}</span>
                        </div>
                    </header>

                    <div data-testid="post-content">
                        <MDXRemote {...source} components={MDXComponents} />
                    </div>
                </article>
            </main>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const { content, ...data } = getPostBySlug(params.slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
        'excerpt',
        'tags',
        'coverImage'
    ]);

    const mdxSource = await serialize(content);
    const stats = readingTime(content);

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
            readingTimeStats: stats,
        },
    };
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug']);

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            };
        }),
        fallback: false,
    };
}
