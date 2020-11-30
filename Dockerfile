FROM node:15.3.0

WORKDIR /usr/node-api
COPY package*.json ./
RUN npm i && npm cache clean --force
ENV NODE_ENV=development PORT=2000 PATH=./node_modules/.bin:$PATH
COPY . .
CMD nodemon src/app.ts