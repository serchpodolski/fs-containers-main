FROM node:24 AS build-stage
WORKDIR /usr/src/app

ARG VITE_BACKEND_URL=/api
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

COPY . .

RUN npm ci

RUN npm run test
RUN npm run build

FROM nginx:alpine AS production-stage
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html