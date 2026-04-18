# Hello Pages — Architecture

## Overview

Hello Pages is a minimal full-stack web application that lets users save and browse text snippets. Users type a piece of text, click **Save**, and the entry appears instantly in a chronological list.

## Tech Stack

| Layer | Technology | Hosting |
|-------|-----------|---------|
| Frontend | React 18 + Vite | AWS Amplify |
| Backend API | Node.js + Express | AWS App Runner |

## Key Design Decisions

- **In-memory storage** — pages are stored in a JavaScript array on the server. Data resets on every deployment or restart. A database (e.g. DynamoDB) would be needed for persistence.
- **CORS** — the backend only accepts requests from the known Amplify domains, configurable via the `ALLOWED_ORIGINS` environment variable.
- **API proxy via Amplify** — the frontend calls `/api/*` on the same Amplify domain. Amplify rewrites those requests to the App Runner backend, avoiding browser mixed-content restrictions.
- **Fetch timeout** — save requests are aborted after 8 seconds to prevent the UI from freezing when the backend is unreachable.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/pages` | Returns all saved pages (newest first) |
| `POST` | `/api/pages` | Creates a new page — body: `{ "text": "..." }` |
| `GET` | `/` | Health check — returns `{ "status": "ok" }` |

## Environment Variables

### Frontend (Amplify)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL for API calls (defaults to `http://localhost:4000/api/pages` in dev) |

### Backend (App Runner)
| Variable | Description |
|----------|-------------|
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins |
| `PORT` | Port the server listens on (defaults to `4000`) |

## Diagrams

- [C4 Container Model](c4-model.puml) — high-level view of the system components
- [Sequence Diagram](sequence-diagram.puml) — front-to-back request flow

## Local Development

```bash
# From the project root
npm run dev
```

Starts both the frontend on `http://localhost:5173` and the backend on `http://localhost:4000`.
