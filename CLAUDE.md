look! a CLAUDE.md file!

# AI Development Guidelines – Recipes Mini App (Next.js)

## Project Goal

Build a production-minded mini application called **“Mininarika”**, inspired by Coolinarika.com.

The goal is NOT visual perfection, but to demonstrate:

- clear architectural thinking
- strong separation of concerns
- SEO-first frontend decisions
- clean backend CRUD API
- readiness for real-world scaling

The solution should be easy to run locally and easy to review.

---

## Tech Stack (Preferred)

- **Next.js 14+ (App Router)**
- **React Server Components by default**
- **TypeScript**
- Backend via **Next.js Route Handlers**
- Persistence via **SQLite + Prisma** (preferred) or equivalent simple persistence
- Validation with **Zod**
- Styling: simple, clean, consistent (no design-heavy UI required)

---

## High-Level Architecture Principles

Always follow these principles:

1. **Clear separation of responsibilities**
   - UI ≠ data fetching ≠ business logic ≠ persistence
2. **Server-first mindset**
   - Fetch data on the server whenever possible
   - Use Client Components only when necessary
3. **SEO is a first-class concern**
   - Metadata must be generated server-side
4. **Code should be readable, modular, and scalable**
   - Avoid monolithic files
   - Prefer explicit naming over cleverness

---

## Recommended Project Structure

```

/app
/recepti
page.tsx              // Recipes list (SSR)
/[slug]
page.tsx            // Recipe details (SSR)
/api
/recipes
route.ts            // GET, POST
/recipes/[slug]
route.ts            // GET, PUT, DELETE
/cdn/[...path]
route.ts              // Fake CDN

/lib
/db.ts                  // DB / Prisma client
/recipes
recipe.model.ts       // Domain types
recipe.service.ts     // Business logic
recipe.validation.ts  // Zod schemas
recipe.mapper.ts      // DB → API mapping

/components
RecipeCard.tsx
RecipeList.tsx

/public
/cdn
/recipes/<slug>/hero.jpg

/prisma
schema.prisma
seed.ts

```

---

## Domain Model – Recipe

The recipe model should support both list and detail views.

Example domain shape (can be adjusted if justified):

```ts
Recipe {
  id: string
  slug: string
  title: string
  lead: string
  image: {
    cdnPath: string
  }
  prepTimeMinutes: number
  servings: number
  difficulty: "Easy" | "Medium" | "Hard"
  dishGroup: string
  tags: string[]
  ingredients: {
    name: string
    amount?: number
    unit?: string
  }[]
  steps: string[]
}
```

### Slug Rules

- Slug must be **unique**
- Slug should be generated from title
- Slug must be **stable** (not regenerated on title update)

---

## Backend API Requirements

Implement CRUD for recipes using Next.js Route Handlers.

### Required Endpoints

- `GET /api/recipes` – list recipes
- `GET /api/recipes/:slug` – recipe detail
- `POST /api/recipes` – create recipe
- `PUT /api/recipes/:slug` – update recipe
- `DELETE /api/recipes/:slug` – delete recipe

### Validation

- Use **Zod** for request validation
- Validate both create and update payloads

### Error Handling

Use consistent HTTP status codes:

- `400` – invalid input
- `404` – recipe not found
- `409` – slug already exists

Error responses should be predictable and machine-readable.

---

## Frontend – Rendering & SEO Strategy

### Recipes List (`/recepti`)

- Server Component
- Data fetched on the server
- Optimized for SEO and performance
- Displays:
  - title
  - thumbnail image
  - lead text
  - prep time
  - difficulty
  - dish group

### Recipe Detail (`/recepti/[slug]`)

- Server Component
- Must implement `generateMetadata()`
- Metadata should include:
  - title
  - description
  - OpenGraph image

Client Components should only be introduced if strictly necessary (e.g. interactive UI).

---

## CDN Simulation (Bonus – Strongly Encouraged)

### Data Model Rule

Never store full image URLs in the database.

Store only:

```
image.cdnPath = "/recipes/<slug>/hero.jpg"
```

### Environment Variable

```
CDN_BASE_URL=http://localhost:3000/cdn
```

### Frontend Usage

The final image URL must be constructed as:

```
${CDN_BASE_URL}${cdnPath}
```

### Fake CDN Implementation

- Implement a route: `GET /cdn/*`
- Serve static files from `/public/cdn`
- Add cache headers:

```
Cache-Control: public, max-age=31536000, immutable
```

This simulates real CDN behavior and cache strategy.

---

## Persistence & Seeding

- The app must persist data (DB or equivalent)
- CRUD operations must mutate persisted state
- Provide seed data:
  - at least 3–5 recipes
  - realistic content
  - real images

Seed should be runnable via a script (e.g. `npm run db:seed`).

---

## Non-Functional Requirements

- Code must be readable and intentional
- Avoid unnecessary abstractions
- Prefer clarity over cleverness
- Keep UI simple but consistent
- Project must start with minimal effort:

  ```
  npm install
  npm run dev
  ```

---

## README Expectations

The README should explain:

- how to run the project
- architectural decisions
- SEO & rendering strategy
- how the fake CDN works
- how this could scale in production

Keep it concise, confident, and professional.

---

## Guiding Principle

This project should feel like:

> “A simplified but realistic slice of a real production system.”

Every decision should be justifiable with:

- performance
- SEO
- maintainability
- future scalability
