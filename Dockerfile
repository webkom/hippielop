FROM node:20-alpine AS build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/yarn.lock ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn", "start"]