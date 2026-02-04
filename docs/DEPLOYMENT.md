# Deployment Guide

This document outlines how to set up and deploy the Meeting Notes App.

## Prerequisites

- Node.js v18+ and npm
- PostgreSQL database

## Environment Variables

Create a copy of the example environment file in the backend:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and set your database connection string:

```text
DATABASE_URL="postgresql://user:password@localhost:5432/meeting_notes"
```

## Local Development

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

## Production Build

### Backend

```bash
cd backend
npm run build
```

### Frontend

```bash
cd frontend
npm run build
```

## Deployment

You can deploy the built assets and the backend to your hosting platform of choice (Heroku, DigitalOcean, AWS, etc.). Ensure the `backend/dist` directory and the `frontend/dist` files are served correctly.

## Containerized Setup

To avoid platform compatibility issues and run both services in Linux containers, use Docker Compose:

```bash
# From the project root
docker compose up --build
```

This will build and run:

- **Backend** service on http://localhost:3000
- **Frontend** service on http://localhost:3001

You don’t need to install Node.js, Prisma, or any language runtimes locally.
