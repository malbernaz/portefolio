const config = require('./config/main')
const server = require('./server')

server.listen(config.port, err => {
  if (err) {
    console.log(err) // eslint-disable-line no-console
  }

  console.log(`\n==>  Api listening on port ${config.port}\n`) // eslint-disable-line no-console
})
