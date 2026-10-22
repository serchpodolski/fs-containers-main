FROM node:24

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --omit=dev

EXPOSE 3000

USER node

CMD [ "npm", "start" ]