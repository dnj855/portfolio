# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copions d'abord les fichiers de dépendances
COPY package*.json pnpm-lock.yaml ./

# Installation de pnpm et des dépendances
RUN corepack enable && \
    corepack prepare pnpm@latest --activate && \
    pnpm install --frozen-lockfile

# Copie du code source uniquement après l'installation des dépendances
# Ainsi, si seul le code change, les dépendances ne seront pas réinstallées
COPY . .

# Construction de l'application
RUN pnpm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Installation minimale de pnpm
RUN corepack enable && \
    corepack prepare pnpm@latest --activate

# Copie uniquement des fichiers nécessaires
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Installation des dépendances de production uniquement
RUN pnpm install --prod --frozen-lockfile

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]