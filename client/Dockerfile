# First build
FROM node:14.15.0-alpine AS build

WORKDIR /app
COPY . /app

RUN yarn install

RUN yarn build

# Second build
FROM node:14.15.0-slim

WORKDIR /app
COPY --from=build /app /app

EXPOSE 3000

CMD ["./node_modules/.bin/next", "start"]
