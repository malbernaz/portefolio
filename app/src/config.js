const title = 'Miguel Albernaz'
const description = 'Rio de Janeiro based web developer'

export default {
  title,
  description,
  httpsPort: process.env.APPHTTPSPORT || 8080,
  httpPort: process.env.APPHTTPPORT || 3000,
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
