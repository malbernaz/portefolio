import http from 'http'

import config from './config/main'
import api from './server'

http.createServer(api).listen(config.port, err => {
  // eslint-disable-next-line no-console
  if (err) console.log(err)

  // eslint-disable-next-line no-console
  console.log(`\n==> Api listening on port ${config.port}\n`)
})
