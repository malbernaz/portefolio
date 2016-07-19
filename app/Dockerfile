FROM node:6.3.0

RUN useradd --user-group --create-home --shell /bin/false app && \
    apt-get update && npm install -g nodemon concurrently


ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/server/

RUN chown -R app:app $HOME/

USER app

WORKDIR $HOME/server

RUN npm install

USER root
COPY . $HOME/server
RUN chown -R app:app $HOME/*
USER app

RUN npm run build

CMD ["npm", "start"]
