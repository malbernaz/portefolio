const http = require('http')

const config = require('./config/main')
const api = require('./server')

const httpServer = http.createServer(api)

httpServer.listen(config.port, err => {
  if (err) {
    console.log(err) // eslint-disable-line no-console
  }

  console.log(`\n==> Api listening on port ${config.port}\n`) // eslint-disable-line no-console
})
