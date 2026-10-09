# ResumeBuilder GenAI — Frontend

The frontend is a React single-page app built with Vite. It lets users create an account, submit a resume and job description, review an AI-generated interview preparation report, browse saved reports, and download a tailored resume PDF.

## Requirements

- Node.js and npm
- The backend running locally (see [the backend README](../backend/README.md))

## Setup

From this directory, install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Vite prints the local URL when the server starts (normally `http://localhost:5173`). The frontend currently sends API requests to `http://localhost:3000` and expects the backend to allow credentials from that Vite origin.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint on the frontend. |

## Routes

| Route | Page | Access |
| --- | --- | --- |
| `/login` | Sign in | Public |
| `/register` | Create an account | Public |
| `/` | Resume and job-description submission, plus saved reports | Signed in |
| `/report/:interviewID` | Interview report and tailored resume download | Signed in |

## Source layout

- `src/components/` — shared interface components such as form fields, navigation, report sections, and the loading page.
- `src/features/auth/` — authentication pages, context, hook, and API calls.
- `src/features/ai/` — report pages, context, hook, and interview API calls.
- `src/app.routes.jsx` — route definitions and protected-route wrappers.

## Configuration

The API base URL is currently set directly in `src/features/auth/services/auth.api.js` and `src/features/ai/services/interview.api.js` to `http://localhost:3000`. Update those URLs and the backend CORS origin together if you run the app on different hosts or ports.

See the [repository README](../README.md) for the full stack setup.
