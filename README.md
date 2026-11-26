# Fuze III — Portfolio

Portfolio of Fuze III, built with Vue 3, Vite and TypeScript, deployed to GitHub Pages.

## Development

```sh
npm install
npm run dev
```

Or with Docker:

```sh
docker compose up
```

The site is served at http://localhost:5173/fuze-portfolio/.

## Scripts

| Command                | Purpose                          |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Development server               |
| `npm run build`        | Type check and production build  |
| `npm run preview`      | Preview the production build     |
| `npm run type-check`   | Type check                       |
| `npm run lint`         | ESLint                           |
| `npm run format`       | Prettier                         |
| `npm run update:video` | Refresh the latest YouTube video |

## Structure

```
src/
├── assets/        Images
├── components/    Components, grouped by domain
├── composables/   Shared reactive state
├── data/          Site content
├── directives/    Custom directives
├── i18n/          Translations (en, fr)
├── pages/         One page per route
├── router/        Routes
├── styles/        Design tokens and global styles
├── types/         Content types
└── utils/         Helpers
```

## Languages

The site is available in English and French. It follows the browser language and falls back to
English. Translations live in `src/i18n/locales`.

## Deployment

Every push to `main` publishes the site through GitHub Actions.
