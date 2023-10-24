FROM node:16.16.0-slim

WORKDIR /

COPY . /

RUN npm install

RUN npm uninstall bcrypt

RUN npm i bcrypt

EXPOSE 1300

CMD ["node", "index.js"]