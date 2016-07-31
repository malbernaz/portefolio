FROM node:6.3.0

RUN useradd --user-group --create-home --shell /bin/false app && \
    echo "America/Sao_Paulo" > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/server/

RUN chown -R app:app $HOME/

USER app

WORKDIR $HOME/server

RUN rm -fr node_modules && npm install

USER root
COPY . $HOME/server
RUN chown -R app:app $HOME/*
USER app

RUN npm run build:prod

CMD ["npm", "start"]
