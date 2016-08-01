# Portefólio

A blog scaffold featuring react, redux, server-side rendering and a markdown editor.

## Instructions:

First of all install Docker. Once you have it, go ahead and build from the source:

```shell
λ docker-compose build
```

Then get your development environment up and running:

```shell
λ docker-compose up
```

Last but not least create a user and you should be able to sign in at `/admin` and play around with the editor:

```curl
λ curl -X POST -H "Authorization: secrettoken" -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded" -d 'username=username&email=email@domain.com&password=password' "http://localhost:5000/user/register"
```

## Acknowledge that:

- I'm using [Docker](http://www.docker.com/) for development and production. If you don't know what Docker is, learn about it and you will make your time worth. Plus they have recently released native clients both for [Mac](http://www.docker.com/products/docker#/mac) and [Windows](http://www.docker.com/products/docker#/windows)!

- For the dev setup I've stick to [`redux-devtools-extension`](https://github.com/zalmoxisus/redux-devtools-extension) (which is only available in chrome). I've had performance issues with the native [`DevTools`](https://github.com/gaearon/redux-devtools).

## TODO:

- [x] Page transitions
- [x] Use webpack 2
- [x] Use docker
- [x] Use css-modules
- [x] Use service workers
- [ ] Create `UserSettings` page
- [ ] Create `ActionsPrompt` component
- [ ] Better way to handle posts metadata
- [ ] Pagination...
- [ ] RSS...
- [ ] Comments...
