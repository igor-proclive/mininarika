# Mininarika

Recipe mini app built with Next.js 16, TypeScript, SQLite, and Tailwind CSS.

## Screenshots

| Recipe list | Recipe detail |
|:-----------:|:-------------:|
| ![Recipe list](/docs/screenshots/list.png) | ![Recipe detail](/docs/screenshots/detail.png) |

## Quick Start

```bash
npm install
npm run db:setup   # generates placeholder images + seeds the database
npm run dev        # starts on http://localhost:3000
```

## Architecture

```
/app
  /recepti              SSR recipe list
  /recepti/[slug]       SSG recipe detail (with generateMetadata)
  /api/recipes          REST API (GET, POST)
  /api/recipes/[slug]   REST API (GET, PUT, DELETE)
  /cdn/[...path]        Fake CDN route

/lib
  /db.ts                SQLite connection (better-sqlite3)
  /cdn.ts               CDN URL construction
  /recipes
    recipe.model.ts     Domain types
    recipe.service.ts   Business logic
    recipe.validation.ts  Zod schemas
    recipe.mapper.ts    DB row → domain mapping

/components
  RecipeCard.tsx
  RecipeList.tsx

/scripts
  seed.ts               Database seeder
  generate-images.ts    Placeholder image generator
```

### Separation of Concerns

Each layer has a single responsibility:

- **Route handlers** parse requests, delegate to services, return responses
- **Services** contain all business logic (slug generation, CRUD operations)
- **Validation** is handled by Zod schemas, separate from business logic
- **Mapper** converts database rows to domain objects
- **Components** receive typed data and render UI

### Rendering Strategy

- **Recipe list** (`/recepti`) — server-rendered on every request (`force-dynamic`), always fresh data
- **Recipe detail** (`/recepti/[slug]`) — statically generated at build time via `generateStaticParams`, with full SEO metadata via `generateMetadata`
- **Home page** — static, no data dependencies

Pages are React Server Components. Client components are used only for the language toggle and translated UI labels.

### SEO

Recipe detail pages generate metadata server-side including title, description, and OpenGraph image. The list page has static metadata. The root layout uses a template pattern for consistent title formatting.

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recipes` | List all recipes |
| GET | `/api/recipes/:slug` | Get recipe by slug |
| POST | `/api/recipes` | Create recipe |
| PUT | `/api/recipes/:slug` | Update recipe |
| DELETE | `/api/recipes/:slug` | Delete recipe |

Validation errors return `400` with Zod issue details. Missing recipes return `404`. Duplicate slugs return `409`.

## CDN Simulation

Images are never stored as full URLs in the database. The database stores only a relative path like `/recipes/crni-rizot/hero.webp`.

The frontend constructs the full URL using `CDN_BASE_URL` from environment:

```
${CDN_BASE_URL}/recipes/crni-rizot/hero.webp
```

The `/cdn/[...path]` route serves files from `/cdn-assets/` with production-style cache headers:

```
Cache-Control: public, max-age=31536000, immutable
```

In production, `CDN_BASE_URL` would point to a real CDN (CloudFront, Cloudflare, etc.) and this route would not be needed.

## Database

SQLite via better-sqlite3. The schema auto-creates on first connection. JSON columns store tags, ingredients, and steps arrays.

Seed data includes 5 Croatian recipes with realistic content.

## Production Scaling

- Replace SQLite with PostgreSQL
- Point `CDN_BASE_URL` to a real CDN, upload images to object storage
- Add ISR (Incremental Static Regeneration) with `revalidate` to recipe detail pages
- Add pagination and filtering to the list API
- Add authentication for write operations
- Add rate limiting to API routes
