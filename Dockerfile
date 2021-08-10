FROM node

SHELL ["/bin/bash", "-c"]

WORKDIR /api

COPY . .

RUN npm i

CMD npm run start:dev
