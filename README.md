# Goofygrab

Independent technology and media publication. Next.js App Router, structured CMS blocks, GSAP motion, reserved-pixel ads.

## Scripts

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Newsroom

Editors work at `/cms`. Create stories, upload media with locked dimensions, schedule, and publish. Publishing revalidates the Next.js cache. The public site never stores articles as a giant HTML string.

## Stack

Next.js 15, React 19, Tailwind CSS 4, GSAP, Lenis. Payload-shaped collections live in `src/cms` and are served through `src/cms/store.ts` until PostgreSQL + S3 are wired.
"# GoofyGrab" 
