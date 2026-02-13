import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import { generateDefaultSeo } from 'next-seo/pages';

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider attribute="class">
            <Head>
                {generateDefaultSeo({
                    title: "Next.js Blog Platform",
                    description: "A high-performance blog platform built with Next.js, MDX, and Tailwind CSS.",
                    openGraph: {
                        type: 'website',
                        locale: 'en_IE',
                        url: 'https://www.example.com/',
                        site_name: 'Next.js Blog',
                    },
                    twitter: {
                        handle: '@handle',
                        site: '@site',
                        cardType: 'summary_large_image',
                    }
                })}
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
