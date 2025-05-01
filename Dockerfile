FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g @nestjs/cli

RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]
