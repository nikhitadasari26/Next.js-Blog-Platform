import Link from 'next/link';
import Header from '@/components/Header';

export default function Custom404() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 flex flex-col">
            <Header />
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                <div data-testid="not-found-message" className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-center">
                    Oops! The page you are looking for does not exist.
                </div>
                <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Go Home
                </Link>
            </div>
        </div>
    );
}
