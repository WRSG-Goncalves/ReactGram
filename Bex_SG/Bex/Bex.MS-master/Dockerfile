FROM node:14

RUN mkdir -p /var/www/api

WORKDIR /var/www/api

COPY . .

RUN npm install -g @babel/core @babel/cli && \
<<<<<<< HEAD
    npm install 
RUN npm run build
RUN apt-get install libfontconfig libfontconfig1
=======
    npm install && \
    npm run build
>>>>>>> a2c28479f7f2c0fd9b5a5a90b66b762cdc9f163d

CMD node dist/server.js