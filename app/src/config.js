const description = 'a blogging platform for the 21th century'

export default {
  apiHost: '127.0.0.1',
  apiPort: '5000',
  description,
  github: 'https://github.com/malbernaz',
  head: {
    title: 'portefolio',
    titleTemplate: 'malbernaz λ %s',
    meta: [{
      name: 'description',
      content: description
    }, {
      charset: 'utf-8'
    }]
  }
}
