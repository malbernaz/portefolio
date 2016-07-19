const fs = require('fs')

const babelrc = fs.readFileSync('./.babelrc')

let config

try {
  config = JSON.parse(babelrc)
  require('babel-core/register')(config) // eslint-disable-line global-require
} catch (err) {
  console.error('ERROR: Error parsing your .babelrc.') // eslint-disable-line no-console
  console.error(err) // eslint-disable-line no-console
}

require('./src/server')
