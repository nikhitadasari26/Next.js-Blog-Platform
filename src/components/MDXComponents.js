import Image from 'next/image';
import Link from 'next/link';

const CustomLink = (props) => {
    const href = props.href;
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
        return (
            <Link href={href} {...props} className="text-blue-600 dark:text-blue-400 hover:underline">
                {props.children}
            </Link>
        );
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} className="text-blue-600 dark:text-blue-400 hover:underline" />;
};

const CustomImage = (props) => {
    return (
        <div className="my-8">
            <Image
                {...props}
                width={800}
                height={450}
                className="rounded-lg shadow-md"
                alt={props.alt}
                data-testid="optimized-image"
            />
        </div>
    );
};

const CodeBlock = (props) => {
    return (
        <pre {...props} data-testid="code-block" className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 overflow-x-auto my-4 border border-gray-200 dark:border-gray-700">
            {props.children}
        </pre>
    )
}


const MDXComponents = {
    img: CustomImage,
    a: CustomLink,
    pre: CodeBlock,
    // Add other standard elements if needed
    h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />,
    h2: (props) => <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-100" {...props} />,
    p: (props) => <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />,
    ul: (props) => <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300" {...props} />,
    ol: (props) => <ol className="list-decimal list-inside mb-4 text-gray-700 dark:text-gray-300" {...props} />,
    blockquote: (props) => <blockquote className="border-l-4 border-blue-500 pl-4 py-2 italic bg-gray-50 dark:bg-gray-800/50 rounded my-4" {...props} />,
};

export default MDXComponents;
