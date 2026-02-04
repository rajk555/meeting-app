# Meeting Notes App

A full-stack application for creating and managing meeting notes.

## Project Structure

```
├── backend/           # Node.js + Express + TypeScript API
├── docs/              # Documentation (including deployment instructions)
├── frontend/          # Vite + React + TypeScript frontend
├── .gitignore
└── README.md
```

## Getting Started

You can use the local development servers or spin up containers:

### Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Containerized Setup

Alternatively, you can run both services in Docker containers without installing Node.js locally:

```bash
docker compose up --build
```

- Backend: http://localhost:3000
- Frontend: http://localhost:3001

