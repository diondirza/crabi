# ---- Base Node ----
FROM node:20-alpine AS base

WORKDIR /app
RUN apk add --no-cache yarn

# ---- Dependencies ----
FROM base AS dependencies
COPY package.json yarn.lock ./
RUN yarn install

# ---- Copy Files -> Build ----
FROM dependencies AS build
WORKDIR /app
COPY . .
RUN yarn build

# ---- Serve ----
FROM node:20-alpine AS release
RUN yarn global add serve
COPY --from=build /app/dist /app
EXPOSE 80
CMD ["serve", "-s", "/app", "-l", "80"]
