# Hello Pages

A simple web app with a React + Vite frontend and a Node.js + Express backend.

## Setup

1. Install dependencies

```bash
npm install
```

2. Start the frontend and backend together

```bash
npm run dev
```

3. Open the frontend

Visit `http://localhost:5173` in your browser.

## Project structure

- `client/` — React + Vite frontend
- `server/` — Express backend API

## API

- `GET /api/pages` — list saved pages
- `POST /api/pages` — save a new page with JSON body `{ "text": "..." }`
