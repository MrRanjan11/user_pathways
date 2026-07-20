FROM node:20-alpine AS base

FROM base AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Next.js standalone mode server port
ENV PORT=80
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/public ./public
# Automatically leverage output traces to reduce image size
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 80

CMD ["node", "server.js"]
