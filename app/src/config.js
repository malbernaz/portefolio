const title = 'Portefólio'
const description = 'A blogging platform for the 21th century'

export default {
  title,
  description,
  port: process.env.PORT || 3000,
  apiHost: process.env.APIHOST || '127.0.1',
  apiPort: process.env.APIPORT || 5000,
  github: 'https://github.com/malbernaz',
  twitter: 'https://twitter.com/miguel_albernaz',
  email: 'albernazmiguel@gmail.com',
  head: {
    title: description,
    titleTemplate: `${title} | %s`,
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    }, {
      name: 'description',
      content: description
    }, {
      name: 'theme-color',
      content: '#f2f2f2'
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
