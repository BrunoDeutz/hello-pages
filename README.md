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

## Environment variables

- Frontend: `VITE_API_URL` should point to the deployed backend API endpoint.
- Example: `VITE_API_URL=https://your-backend.example.com/api/pages`

## AWS Deployment

### Frontend (AWS Amplify)

1. Open the AWS Amplify Console.
2. Connect your GitHub repo `https://github.com/BrunoDeutz/hello-pages`.
3. Use branch `main`.
4. Amplify will use `amplify.yml` from the repo root.
5. Set environment variable:
   - `VITE_API_URL=https://<your-backend-domain>/api/pages`

### Backend (Elastic Beanstalk)

1. Create a new Elastic Beanstalk application for Node.js.
2. Choose the `server` folder contents as the source package.
3. Confirm `server/index.js` uses `process.env.PORT || 4000`.
4. Set environment variable:
   - `ALLOWED_ORIGINS=http://localhost:5173,https://<your-amplify-domain>`
5. Deploy and copy the generated backend URL.
6. Use that URL in Amplify `VITE_API_URL`.
