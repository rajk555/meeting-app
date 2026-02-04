# Backend Dockerfile for Linux container (avoids Windows ARM64 binary issues)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package manifests
COPY package.json package-lock.json ./

# Install dependencies (production only)
RUN npm ci --omit=dev

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source code and build
COPY src ./src
RUN npm run build

# Expose application port
EXPOSE 3000

# Run the compiled server
CMD ["node", "dist/index.js"]
