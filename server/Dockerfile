FROM node:16-bullseye-slim

RUN mkdir -p /opt/server/node_modules 

WORKDIR /opt/server

COPY ./server/package*.json ./

RUN npm install

COPY ./server .

CMD ["node", "index.js"]