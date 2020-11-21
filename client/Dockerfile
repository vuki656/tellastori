FROM node:14.15.0-alpine AS build

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start-prod"]
