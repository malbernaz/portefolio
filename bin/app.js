#!/usr/bin/env node

const fs = require('fs')

const babelrc = fs.readFileSync('./.babelrc')

let config

try {
  config = JSON.parse(babelrc)
  require('babel-core/register')(config) // eslint-disable-line
} catch (err) {
  console.error('ERROR: Error parsing your .babelrc.')
  console.error(err)
}

require('../app/src/server')