FROM node:20
ENV TZ="Europe/Berlin"
WORKDIR /usr/src/stats-bot
COPY package*.json ./
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && npm install
COPY . .
CMD ["node", "src/index.js"]