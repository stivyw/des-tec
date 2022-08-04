FROM node:16-alpine

RUN yarn global add sequelize-cli

USER node

WORKDIR /home/node/app

COPY --chown=node:node package*.json .
COPY --chown=node:node yarn* .

RUN yarn

CMD sh -l -c "yarn && yarn start"
