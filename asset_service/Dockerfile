FROM node:7

ADD . /app

RUN cd /app; \
  npm install

EXPOSE 3030
CMD cd /app; \
  npm start