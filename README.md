# MAZAR Maritime Museum

Static React website for the MAZAR Maritime Museum architecture graduation project.

## Scripts

- `npm run dev` starts the local Vite server.
- `npm run test` runs Vitest checks.
- `npm run build` type-checks and builds the static site.
- `npm run prepare:assets` regenerates optimized public assets from `source-assets/`.

## Content Updates

Primary site content lives in `src/data/site.ts`.

Original large renders are kept locally in `source-assets/` and are not deployed. Optimized files are generated into `public/images`, `public/panos`, and `public/vendor`.

## Deployment

GitHub Pages deploys from `.github/workflows/deploy.yml`. The Vite base path is `/mazar/`, matching `https://youssefg7.github.io/mazar/`.
