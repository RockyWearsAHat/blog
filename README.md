# Alex Waldmann Site

A Vite + React personal engineering lab, portfolio, writing hub, and interactive tools site.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to Netlify

1. Push this folder to GitHub.
2. In Netlify, choose **Add new site → Import an existing project**.
3. Connect the repository.
4. Use build command `npm run build` and publish directory `dist`.
5. Add environment variables from `.env.example` under **Site configuration → Environment variables**.
6. After buying a domain, go to **Domain management → Add a domain** and follow Netlify DNS instructions.

## Google Ads / AdSense

This project includes a production-safe AdSense component. Ads only load when `VITE_ADSENSE_CLIENT` is set.

Replace `data-ad-slot` placeholders in `src/components/AdSlot.jsx` usage with real ad slot IDs after Google approves the site and creates your ad units.

Suggested approach: publish the site first, add original posts/projects/tools, apply to AdSense, then add real slot IDs.

## Edit content

- Blog posts: `src/data/posts.js`
- Projects: `src/data/projects.js`
- Lab tools: `src/data/labTools.js`
- Personal settings/links: `src/data/site.js`
