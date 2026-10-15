# AI Frontend Helper Project

A mini frontend helper project with reusable UI components (navbar, hero, cards, and personalized form) plus secure OpenAI-backed guidance with a runnable fallback mode.

## Features

- Reusable UI sections: navbar, hero, feature cards, personalized form
- Responsive layout and keyboard-accessible controls with visible focus styles
- Personalization via saved name (`localStorage`)
- Secure server-side OpenAI call (no browser API key exposure)
- Fallback behavior when API key/service is unavailable

## Setup

1. Clone the repo and enter the project directory.
2. (Optional) Copy environment template:
   ```bash
   cp .env.example .env
   ```
3. Add your OpenAI key in `.env`:
   ```bash
   OPENAI_API_KEY=...
   ```

## Run locally

### Frontend-only fallback mode (no credentials required)

Open `index.html` in a browser. The app runs fully with local fallback responses.

### Secure OpenAI mode (recommended)

Run with Netlify Dev so the function route is available:

```bash
npx netlify dev
```

This serves the app and exposes the secure API route at `/.netlify/functions/ai-helper`.

## Validation

Run lightweight tests:

```bash
node --test tests/ai-helper-utils.test.js
```

Optional syntax checks:

```bash
node --check script.js
node --check netlify/functions/ai-helper.js
```

## Build

No bundling step is required for this mini project.
