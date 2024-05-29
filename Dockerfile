FROM node:21-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3333

CMD ["yarn", "dev"]
