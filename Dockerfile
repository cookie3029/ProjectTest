FROM node:latest

ARG ENV_FILE=.env

ENV ENV_FILE=${ENV_FILE}

RUN mkdir -p /opt/app

WORKDIR /opt/app

RUN npm install -g yarn

COPY package.json yarn.lock ./

COPY ${ENV_FILE} .env

COPY . .

RUN yarn

EXPOSE 5000  

CMD [ "yarn", "start"]