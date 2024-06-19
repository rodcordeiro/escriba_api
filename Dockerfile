FROM node:20 AS builder

WORKDIR /escriba

ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
ENV NEW_RELIC_LOG=stdout


COPY . .

RUN yarn && yarn build

EXPOSE 80

CMD [ "yarn", "start:prod" ]
