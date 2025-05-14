# products-web

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Next, NONE, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js 15** - Full-stack React framework with:
  - App Router
  - Server Components
  - Metadata API with OpenGraph images and Twitter cards
  - Dynamic route parameters
  - Server-side data fetching and caching
  - API routes
  - Error handling and loading states
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components with:
  - Dark mode support
  - Carousel component
  - Cards
  - Buttons
  - Dropdowns
  - Labels and inputs
  - Loading skeletons
- **Bun** - Fast JavaScript runtime and package manager 
- **Biome** - Modern linting and formatting
- **Turborepo** - Optimized monorepo build system
- **SEO Optimized** with:
  - OpenGraph metadata for better social media sharing
  - Twitter card support
  - Descriptive meta tags
  - Page-specific metadata
  - Dynamic OG images based on product data
- **Responsive Design** - Mobile-first layout that works on all screen sizes
- **Dynamic Product Pages** with:
  - Image galleries
  - Size and color variants
  - Delivery calculator
  - Cart functionality
  - Product recommendations

## Getting Started

First, install the dependencies:

```bash
bun install
```


Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.

The API is running at [https://products-page-server.vercel.app](https://products-page-server.vercel.app).



## Project Structure

```
products-web/
├── apps/
│   ├── web/         # Frontend application (Next.js)
│   └── server/      # Backend API (Next, NONE)
```

## Available Scripts

- `bun dev`: Start all applications in development mode
- `bun build`: Build all applications
- `bun dev:web`: Start only the web application
- `bun dev:server`: Start only the server
- `bun check-types`: Check TypeScript types across all apps
- `bun check`: Run Biome formatting and linting
