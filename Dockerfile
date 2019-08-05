FROM node:10.16.1-jessie

MAINTAINER Vadim Rommer <vadim.rommer@gmail.com>

ENV DEBIAN_FRONTEND noninteractive
RUN npm install -g @angular/cli
RUN git clone https://github.com/vrommer/fridman.git
WORKDIR "fridman"
RUN npm install
WORKDIR "angular-src"
RUN npm install
RUN ["ng", "build"]
EXPOSE 8000
