From node:lts-alpine3.10

RUN mkdir /code
WORKDIR /code

RUN apk add --no-cache git

COPY package*.json ./
RUN npm ci --only=production

COPY . .

CMD ["npm", "start"]