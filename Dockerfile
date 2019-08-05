FROM meanjs/mean

MAINTAINER Vadim Rommer <vadim.rommer@gmail.com>

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN sudo apt-get update
RUN sudo apt-get --assume-yes install yarn
RUN git clone https://github.com/vrommer/fridman.git
WORKDIR "fridman"
RUN npm install
WORKDIR "angular-src"
RUN npm install
