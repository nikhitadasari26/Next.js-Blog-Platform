# Next.js Blog Platform

A high-performance, SEO-optimized blog platform built with Next.js, MDX, and Tailwind CSS. This project leverages Static Site Generation (SSG) for fast load times and optimal search engine visibility, fully containerized with Docker.

## 🚀 Features

-   **Static Site Generation (SSG)**: All pages are pre-rendered at build time for exceptional performance.
-   **MDX Support**: Write content in Markdown with the ability to embed React components.
-   **Dynamic Routing**: Blog posts are generated dynamically from `.mdx` files in the `/posts` directory.
-   **SEO Optimized**: Integrated `next-seo` for managing meta tags, Open Graph, and Twitter Cards.
-   **Theme Toggle**: Dark and Light mode support using `next-themes` and Tailwind CSS.
-   **Pagination**: content is paginated to ensuring faster page loads (10 posts per page).
-   **Image Optimization**: Automatic image optimization using `next/image`.
-   **Sitemap & RSS**: Automatic generation of `sitemap.xml` and `rss.xml` at build time.
-   **Dockerized**: Production-ready `Dockerfile` and `docker-compose.yml` for consistent deployment.
-   **Responsive Design**: Mobile-first styling with Tailwind CSS v4.

## 🛠️ Tech Stack

-   **Framework**: Next.js (Pages Router)
-   **Styling**: Tailwind CSS, `@tailwindcss/typography`
-   **Content**: MDX (`next-mdx-remote`, `gray-matter`)
-   **SEO**: `next-seo`
-   **Utils**: `date-fns`, `reading-time`
-   **Containerization**: Docker, Docker Compose

## 📂 Project Structure

```bash
├── posts/                  # MDX blog post files
├── public/                 # Static assets (images, favicon)
│   ├── rss.xml             # Generated RSS feed
│   └── sitemap.xml         # Generated Sitemap
├── scripts/                # Build scripts (sitemap, rss generators)
├── src/
│   ├── components/         # React components (Header, MDXComponents)
│   ├── lib/                # Utility functions (mdx.js)
│   ├── pages/              # Next.js Routes
│   │   ├── blog/           # Blog listing & pagination
│   │   ├── posts/          # Individual blog posts ([slug].js)
│   │   ├── index.js        # Homepage
│   │   ├── 404.js          # Custom 404 page
│   │   └── _app.js         # App wrapper (Theme & SEO provider)
│   └── styles/             # Global styles (Tailwind)
├── Dockerfile              # Docker build configuration
├── docker-compose.yml      # Docker creation and startup configuration
├── next.config.js          # Next.js configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🏁 Getting Started

### Prerequisites
-   Node.js 20+ (recommended)
-   Docker (optional, for containerized run)

### 1. Installation
Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd NextJs_Blog_Platform
npm install
```

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env
```
*Note: The project comes with default public variables pre-configured for safe testing.*

### 3. Running Locally
Start the development server:
```bash
npm run dev
```
Visit `http://localhost:3000`.

### 4. Production Build
To test the production build locally:
```bash
npm run build
npm start
```

## 🐳 Running with Docker

The application is fully containerized. To run it using Docker Compose:

1.  **Build and Start**:
    ```bash
    docker-compose up --build
    ```
2.  **Access**:
    Open `http://localhost:3000` in your browser.

*Note: The Docker build uses `node:20-alpine` and performs a full production build (`npm run build`).*

## ✅ Verification & Testing

The application includes `data-testid` attributes on key elements to facilitate automated testing.

-   **Homepage**: Check for `post-list` and `read-more-[slug]` buttons.
-   **Blog Page**: Verify `pagination` controls.
-   **Post Page**: Confirm `blog-post`, `post-title`, and `reading-time` are visible.
-   **Theme**: Toggle the moon/sun icon (Header) and verify the `html` class changes to `dark`.
-   **Feeds**: access `/sitemap.xml` and `/rss.xml`.

## 📜 License

ISC
