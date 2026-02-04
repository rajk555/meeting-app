# Frontend Dockerfile (builds and serves static assets)
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source & build
COPY . .
RUN npm run build

# Install a static file server
RUN npm install -g serve

# Expose default Vite build port
EXPOSE 3000

# Serve the built static files
CMD ["serve", "-s", "dist", "-l", "3000"]
