FROM node:6.3.0

RUN useradd --user-group --create-home --shell /bin/false api && apt-get update

ENV HOME=/home/api

COPY package.json npm-shrinkwrap.json $HOME/server/

RUN chown -R api:api $HOME/

USER api

WORKDIR $HOME/server

RUN npm install

USER root
COPY . $HOME/server
RUN chown -R api:api $HOME/*
USER api

CMD ["npm", "start"]