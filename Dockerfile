FROM node:alpine

WORKDIR /server

COPY ./dev-repo-server/package.json .

RUN npm install

COPY ./dev-repo-server .

CMD ["node", "server.js"]