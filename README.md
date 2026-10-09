# ResumeBuilder GenAI

A full-stack resume and interview preparation app. A signed-in user uploads a resume PDF, enters a job description and self-description, and receives an AI-generated match score, interview questions with suggested answers, skill gaps, and a preparation plan. The app stores reports and can generate a tailored resume PDF.

## Project folders

- [`frontend/`](frontend/README.md) — React 19, Vite, and Tailwind CSS frontend.
- [`backend/`](backend/README.md) — Express API, MongoDB persistence, Gemini integration, and PDF processing.

## Requirements

- Node.js and npm
- MongoDB database
- Google Gemini API key

## Run locally

1. Configure the backend environment in `backend/.env`:

   ```dotenv
   PORT=3000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<a-long-random-secret>
   GEMINI_API_KEY=<your-gemini-api-key>
   ```

2. In one terminal, install and start the backend:

   ```bash
   cd backend
   npm ci
   npm run dev
   ```

3. In a second terminal, install and start the frontend:

   ```bash
   cd frontend
   npm ci
   npm run dev
   ```

4. Open the URL printed by Vite (normally `http://localhost:5173`). The API runs on `http://localhost:3000` by default.

The frontend API URLs and backend CORS origin are currently configured for these local addresses. Update both sides if you use different hosts or ports. Keep secrets in the ignored backend `.env` file; never commit credentials.

**Known API mismatch:** the backend exposes logout as `GET /api/auth/logout`, but the frontend currently calls it with `POST`. Align the methods for logout to work.

## Main frontend routes

- `/register` — create an account.
- `/login` — sign in.
- `/` — submit a resume and job details, and view saved reports.
- `/report/:interviewID` — view a report and download a tailored resume PDF.

For component details, backend endpoints, and package commands, see the frontend and backend READMEs linked above.
