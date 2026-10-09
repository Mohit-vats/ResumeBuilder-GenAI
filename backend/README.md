# ResumeBuilder GenAI — Backend

The backend is an Express API. It handles account authentication, stores interview reports in MongoDB, extracts text from uploaded PDF resumes, calls Gemini to generate interview preparation content, and creates tailored resume PDFs.

## Requirements

- Node.js and npm
- MongoDB connection string
- Google Gemini API key

## Setup

From this directory, install dependencies, create a local `.env` file, and start the development server:

```bash
npm ci
```

Create `.env` in the backend directory with the following variables:

```dotenv
PORT=3000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<a-long-random-secret>
GEMINI_API_KEY=<your-gemini-api-key>
```

Then run:

```bash
npm run dev
```

The server listens on port `3000` by default. Keep `.env` local and do not commit secrets.

## API overview

All routes are mounted under `/api`.

| Method | Path | Purpose | Access |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Create an account | Public |
| `POST` | `/api/auth/login` | Sign in and set the auth cookie | Public |
| `GET` | `/api/auth/logout` | Sign out and clear the auth cookie | Auth cookie |
| `GET` | `/api/auth/get-me` | Return the signed-in user's profile | Auth cookie |
| `POST` | `/api/interview/` | Upload a PDF resume and generate a report | Auth cookie; multipart form |
| `GET` | `/api/interview/report` | List the signed-in user's reports | Auth cookie |
| `GET` | `/api/interview/report/:interviewID` | Fetch a report | Auth cookie |
| `GET` | `/api/interview/report/pdf/:interviewID` | Generate and download a tailored PDF | Auth cookie |

The report-generation form fields are `jobDescription`, `selfDescription`, and `resume` (a PDF file). Authentication uses an HTTP cookie; frontend requests must include credentials.

## Source layout

- `src/controllers/` — authentication and interview request handlers.
- `src/routes/` — route definitions.
- `src/models/` — MongoDB user, report, and token blacklist schemas.
- `src/middlewares/` — authentication and resume upload handling.
- `src/services/` — Gemini report generation and PDF creation.
- `src/config/database.js` — MongoDB connection.
- `server.js` — environment loading, database connection, and HTTP server startup.

## Notes

- CORS currently allows `http://localhost:5173` with credentials. Change this when hosting the frontend elsewhere.
- The backend exposes logout as `GET /api/auth/logout`, while the frontend currently sends `POST /api/auth/logout`; align these methods for logout to work.
- The backend package provides `npm run dev` (Nodemon). Its `npm test` script is a placeholder and does not run a test suite.
- PDF generation uses Puppeteer and may require its supported browser runtime in the deployment environment.

See the [repository README](../README.md) for the full stack setup.
