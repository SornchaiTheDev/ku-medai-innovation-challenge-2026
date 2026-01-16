# Stage 1: Build
FROM node:22-slim AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Enable corepack for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Production
FROM node:22-slim

WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/.output ./ 

# Expose port
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production

# Run the Nitro server
CMD ["node", "./server/index.mjs"]
