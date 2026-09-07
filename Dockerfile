# Installation des dependances
FROM node:22-alpine AS dependances

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci

#Stage 1 build
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=dependances /app/node_modules ./node_modules
COPY . .

RUN npm run build 

#Stage 2 production 
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

#Pour eviter de faire tourner l'application avec root 
RUN chown -R node:node /app
USER node

EXPOSE 3000

CMD ["npm", "start"]