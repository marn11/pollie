FROM node:20-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3001

CMD npx prisma migrate deploy && npm run start:dev