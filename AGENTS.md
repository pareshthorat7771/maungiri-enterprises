# AGENTS.md

## Project Overview
- Repository: `maungiri-enterprises`
- Stack: React 18 + Vite 5
- Styling: Tailwind CSS v4

## Working Agreement for Agents
- Keep changes small and focused on the requested task.
- Avoid unrelated refactors.
- Preserve existing behavior unless the task explicitly asks to change it.

## Setup
1. `npm install`
2. `npm run dev` (local development)

## Validation
- Build check: `npm run build`
- Preview production build: `npm run preview`

> Note: There is currently no dedicated test script in `package.json`.

## Repository Layout
- `/src/main.jsx` — app entrypoint
- `/src/App.jsx` — main application UI and logic
- `/src/translations.js` — translation/content data
- `/src/index.css` — global styles
- `/public` — static assets

## Change Guidelines
- Keep UI text/content updates in `src/translations.js` where applicable.
- Keep reusable UI logic/components in `src` and avoid duplicating behavior.
- Ensure any change still builds successfully with `npm run build`.
