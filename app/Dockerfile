FROM node:6.9.1

RUN useradd --user-group --create-home --shell /bin/false app && \
    echo "America/Sao_Paulo" > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata && \
    npm install yarn -g

ENV HOME=/home/app

ENV NODE_CONFIG_LOGLEVEL=warn

COPY package.json yarn.lock $HOME/server/

RUN chown -R app:app $HOME/

USER app

WORKDIR $HOME/server

USER root
COPY . $HOME/server
RUN chown -R app:app $HOME/*
USER app

RUN rm -fr node_modules/** && yarn install

RUN yarn run build:prod && yarn test


CMD ["yarn", "start"]
