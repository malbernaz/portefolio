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
      content: '#526fff'
    }],
    link: [{
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png'
    }, {
      rel: 'icon',
      type: 'mage/png',
      sizes: '32x32',
      href: '/favicon-32x32.png'
    }, {
      rel: 'icon',
      type: 'mage/png',
      sizes: '16x16',
      href: '/favicon-32x32.png'
    }, {
      rel: 'manifest',
      href: '/manifest.json'
    }, {
      rel: 'mask-icon',
      color: '#526fff',
      href: '/safari-pinned-tab.svg'
    }]
  }
}
