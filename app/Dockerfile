FROM node:6.6.0

RUN useradd --user-group --create-home --shell /bin/false app && \
    echo "America/Sao_Paulo" > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata

ENV HOME=/home/app

ENV NODE_CONFIG_LOGLEVEL=warn

COPY package.json $HOME/server/

RUN chown -R app:app $HOME/

USER app

WORKDIR $HOME/server

USER root
COPY . $HOME/server
RUN chown -R app:app $HOME/*
USER app

RUN rm -fr node_modules/** && \
    npm install && \
    npm run build:prod && \
    npm test

CMD ["npm", "start"]
