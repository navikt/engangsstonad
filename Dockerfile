FROM node:carbon

WORKDIR /usr/src/app

RUN yarn install

COPY package.json ./
COPY yarn.lock ./

COPY . .
EXPOSE 8080

CMD ["yarn", "start-express"]