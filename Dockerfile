FROM alpine as base
RUN apk add --update nodejs npm
RUN npm i -g yarn

FROM base as build
WORKDIR /usr/src/reactivers
COPY . .
RUN rm -rf node_modules
RUN rm -rf dist
RUN yarn install --frozen-lockfile --network-timeout 100000
RUN yarn test
RUN yarn test:e2e
RUN yarn build

FROM base as prod
WORKDIR /usr/src/app/reactivers
COPY --from=build /usr/src/reactivers/node_modules/ ./node_modules/
COPY --from=build /usr/src/reactivers/dist/ ./dist/
COPY --from=build /usr/src/reactivers/package.json .
COPY --from=build /usr/src/reactivers/tsconfig.json .
COPY --from=build /usr/src/reactivers/.env .

CMD  ["npm","run", "start:prod"]