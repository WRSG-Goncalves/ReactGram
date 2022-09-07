FROM node:12.13.0-alpine

RUN apk update && apk add build-base git python

RUN mkdir -p /home/app

COPY . /home/app

WORKDIR /home/app

RUN yarn install

EXPOSE 8083
ENV PORT 8083
ENV NODE_ENV development

CMD ["yarn", "start"]