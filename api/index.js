const fs = require('fs')
const http = require('http')
const https = require('https')

const config = require('./config/main')
const api = require('./server')

if (process.env.NODE_ENV === 'production') {
  const key = fs.readFileSync('/etc/letsencrypt/server.key', 'utf8')
  const cert = fs.readFileSync('/etc/letsencrypt/server.crt', 'utf8')

  const credentials = { key, cert }

  const httpsServer = https.createServer(credentials, api)

  httpsServer.listen(config.port, err => {
    if (err) {
      console.log(err) // eslint-disable-line no-console
    }

    console.log(`\n==>  Api listening on port ${config.port}\n`) // eslint-disable-line no-console
  })
} else {
  const httpServer = http.createServer(api)

  httpServer.listen(config.port, err => {
    if (err) {
      console.log(err) // eslint-disable-line no-console
    }

    console.log(`\n==>  Api listening on port ${config.port}\n`) // eslint-disable-line no-console
  })
}
