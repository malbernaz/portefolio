FROM node:6.9.1

RUN useradd --user-group --create-home --shell /bin/false api && \
    echo "America/Sao_Paulo" > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata && \
    npm install yarn -g

ENV HOME=/home/api

COPY package.json yarn.lock $HOME/server/

RUN chown -R api:api $HOME/

USER api

WORKDIR $HOME/server

USER root
COPY . $HOME/server
RUN chown -R api:api $HOME/*
USER api

RUN rm -fr node_modules/** && yarn install

CMD ["yarn", "start"]
