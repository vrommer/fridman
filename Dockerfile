FROM node:10.16.1-jessie

MAINTAINER Vadim Rommer <vadim.rommer@gmail.com>

ENV DEBIAN_FRONTEND noninteractive
RUN npm install -g @angular/cli
RUN git clone https://github.com/vrommer/fridman.git
WORKDIR "/fridman"
COPY db.properties .
RUN npm install
WORKDIR "/fridman/angular-src"
RUN npm install
RUN ["ng", "build", "--prod"]
WORKDIR "/fridman"
RUN rm -rf angular-src
RUN pwd
EXPOSE 3000
ENTRYPOINT exec npm start

