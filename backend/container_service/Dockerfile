From node:lts-alpine3.9

RUN mkdir /code
WORKDIR /code

COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 8080

CMD ["npm", "start"]