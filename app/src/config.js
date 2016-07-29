const description = 'a blogging platform for the 21th century'

export default {
  title: 'Portefólio',
  apiHost: process.env.DOCKER ? 'api' : '127.0.1',
  apiPort: '5000',
  description,
  github: 'https://github.com/malbernaz',
  twitter: 'https://twitter.com/miguel_albernaz',
  email: 'albernazmiguel@gmail.com',
  head: {
    title: '',
    titleTemplate: 'Portefólio | %s',
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    }, {
      name: 'description',
      content: description
    }, {
      'theme-color': '#526eff'
    }],
    link: [{
      rel: 'icon',
      href: '/img/icon.png'
    }, {
      rel: 'manifest',
      href: '/manifest.json'
    }]
  }
}
