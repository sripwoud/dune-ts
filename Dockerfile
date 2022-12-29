FROM node:19-alpine as build

RUN apk update
RUN apk add bash

RUN npm i -g pnpm

ENV PATH /app/node_modules/.bin:$PATH
WORKDIR app

COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm i -P --frozen-lockfile --ignore-scripts --reporter=silent
RUN pnpm i reflect-metadata ts-node-dev tsconfig-paths tslib typescript

COPY .env package-scripts.yaml tsconfig.json tsconfig.compile.json .barrelsby.json ./
COPY src src

COPY scripts/secrets-entrypoint.sh /usr/local/bin/secrets-entrypoint.sh
RUN chmod +x /usr/local/bin/secrets-entrypoint.sh
ENTRYPOINT ["secrets-entrypoint.sh"]

RUN nps build

CMD ["nps", "start.prod"]

