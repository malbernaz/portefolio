FROM node:6.2.0-wheezy

RUN useradd --user-group --create-home --shell /bin/false api && \
    npm install -g \
    nodemon \
    babel-core \
    babel-preset-es2015 \
    babel-preset-stage-0 \
    babel-plugin-transform-decorators-legacy \
    webpack \

ENV HOME=/home/api

COPY ../package.json $HOME/server/

RUN chown -R api:api $HOME/

USER api

WORKDIR $HOME/server

RUN npm install

USER root
COPY . $HOME/server
RUN chown -R api:api $HOME/*
USER api

CMD ["node", "index.js"]
