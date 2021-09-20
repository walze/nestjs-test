FROM node

SHELL ["/bin/bash", "-c"]

WORKDIR /api

COPY . .

RUN npm i -g npm

RUN yarn

RUN npx sequelize-cli db:seed:all

CMD yarn start:dev
