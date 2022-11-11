FROM node:alpine

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]