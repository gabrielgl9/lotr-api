FROM node:alpine

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./

COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./

RUN npm i

RUN npx prisma generate

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]