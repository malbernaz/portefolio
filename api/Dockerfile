FROM node:6.6.0

RUN useradd --user-group --create-home --shell /bin/false api && \
    echo "America/Sao_Paulo" > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata

ENV HOME=/home/api

ENV NODE_CONFIG_LOGLEVEL=warn

COPY package.json npm-shrinkwrap.json $HOME/server/

RUN chown -R api:api $HOME/

USER api

WORKDIR $HOME/server

RUN rm -fr node_modules && npm install --silent

USER root
COPY . $HOME/server
RUN chown -R api:api $HOME/*
USER api

CMD ["npm", "start"]
