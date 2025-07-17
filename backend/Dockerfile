FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

RUN npx prisma generate

RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/
RUN yarn install --production
RUN npx prisma generate

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/nest-cli.json ./

EXPOSE 5000

CMD ["yarn", "start:prod"]