# Personal AI Assistant Platform (MVP)

A full-stack, Vercel-ready Next.js app for managing personal AI assistants.

## Tech Stack
- Next.js App Router
- Tailwind CSS
- API Routes (Node.js runtime)
- JSON file database (`data/db.json`) for MVP

## Features
- Dummy login authentication with protected routes
- SaaS-style dashboard layout (sidebar + topbar)
- Agent management (create/list + API CRUD)
- Build with AI assistant generator using OpenAI
- Tools integration toggles (Gmail, Calendar, Google Sheets)
- Activity logs table and API

## Dummy Login Credentials
- Email: `admin@example.com`
- Password: `admin123`

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env.local
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Open: `http://localhost:3000`

## API Routes
- `POST /api/login`
- `GET, POST /api/agents`
- `PUT, DELETE /api/agents/:id`
- `GET, PATCH /api/tools`
- `GET /api/logs`
- `POST /api/build-with-ai`

## Deployment (Vercel)
- Push repo to GitHub.
- Import project in Vercel.
- Add environment variable `OPENAI_API_KEY`.
- Deploy.

This app is configured for default Vercel Next.js deployment.
