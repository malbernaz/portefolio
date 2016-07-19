const description = 'a blogging platform for the 21th century'

export default {
  title: 'Portefólio',
  apiHost: 'api',
  apiPort: '5000',
  description,
  github: 'https://github.com/malbernaz',
  twitter: 'https://twitter.com/miguel_albernaz',
  email: 'albernazmiguel@gmail.com',
  head: {
    title: '',
    titleTemplate: 'Portefólio λ %s',
    meta: [{
      name: 'description',
      content: description
    }, {
      charset: 'utf-8'
    }]
  }
}
