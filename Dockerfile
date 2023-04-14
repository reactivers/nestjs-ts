FROM alpine as base
RUN apk add --update nodejs npm
RUN npm i -g yarn

FROM base as build
WORKDIR /usr/src/reactivers
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 100000
COPY . .
RUN yarn build
RUN yarn test
RUN yarn test:e2e

FROM base as prod
WORKDIR /usr/src/app/reactivers
COPY --from=build /usr/src/reactivers/node_modules/ ./node_modules/
COPY --from=build /usr/src/reactivers/dist/ ./dist/
COPY --from=build /usr/src/reactivers/package.json .
COPY --from=build /usr/src/reactivers/tsconfig.json .
COPY --from=build /usr/src/reactivers/.env .

CMD  ["npm","run", "start:prod"]