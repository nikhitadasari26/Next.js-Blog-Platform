import Head from 'next/head';
import { getAllPosts } from '@/lib/mdx';
import Link from 'next/link';
import Header from '@/components/Header';

export default function Home({ posts }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <Head>
                    <title>Next.js Blog Platform</title>
                    <meta name="description" content="A simple blog platform built with Next.js and MDX" />
                </Head>

                <section className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
                        Welcome to My Blog
                    </h1>
                    <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Explorations in Web Development, SSG, and Next.js.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Recent Posts
                    </h2>
                    <div data-testid="post-list" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <article
                                key={post.slug}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
                                data-testid={`post-card-${post.slug}`}
                            >
                                <div className="p-6 flex-grow">
                                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-2 font-medium">
                                        {new Date(post.date).toLocaleDateString()}
                                    </p>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                        <Link href={`/posts/${post.slug}`} className="hover:underline">
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 mt-auto">
                                    <Link
                                        href={`/posts/${post.slug}`}
                                        className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 flex items-center group"
                                        data-testid={`read-more-${post.slug}`}
                                    >
                                        Read More
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export async function getStaticProps() {
    const allPosts = getAllPosts(['title', 'date', 'slug', 'excerpt']);
    return {
        props: { posts: allPosts.slice(0, 6) }, // Show top 6 posts on homepage
    };
}
