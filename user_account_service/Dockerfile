FROM node:7

ADD . /app

RUN cd /app; \
  npm install

EXPOSE 8080
CMD cd /app; \
  npm start