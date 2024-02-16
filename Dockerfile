FROM node:20
WORKDIR /usr/src/stats-bot
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "src/index.js"]