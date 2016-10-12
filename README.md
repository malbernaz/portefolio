# Portefólio

My personal blog featuring isomorphic react, redux and a markdown editor.

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
λ curl -X POST -H "Authorization: secrettoken" -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded" -d 'username=username&email=email@domain.com&password=password' "http://localhost:8080/api/user/register"
```
