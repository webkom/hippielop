FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 5555

RUN apk add --no-cache openssl

CMD ["yarn", "prisma", "studio"]
