FROM node:10.16-alpine
WORKDIR /usr

COPY . .

RUN npm install --production
RUN npm run build

CMD [ "npm","run", "start" ]