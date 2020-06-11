FROM node:alpine
MAINTAINER NTT Brazil Software Engineering

ENV NODE_ENV=QA

COPY ./ /var/www/
COPY ./cert /etc/ssl/

WORKDIR /var/www/

ENTRYPOINT npm run start:prod
EXPOSE 3022
