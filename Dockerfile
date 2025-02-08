# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Installation de pnpm via npm (plus fiable que corepack)
RUN npm install -g pnpm

# Copie des fichiers de dépendances
COPY package*.json pnpm-lock.yaml ./

# Installation des dépendances
RUN pnpm install --frozen-lockfile

# Copie du code source
COPY . .

# Construction de l'application
RUN pnpm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Installation de pnpm
RUN npm install -g pnpm

# Copie des fichiers nécessaires
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Installation des dépendances de production
RUN pnpm install --prod --frozen-lockfile

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]