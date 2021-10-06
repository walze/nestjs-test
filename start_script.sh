#!/bin/bash

npx sequelize-cli db:seed:all

yarn start:dev
