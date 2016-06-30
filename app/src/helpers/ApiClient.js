import superagent from 'superagent'
import config from '../config'

const methods = ['get', 'post', 'put', 'del']

const isServer = typeof window !== 'object'

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path

  if (isServer) {
    return `http://${config.apiHost}:${config.apiPort + adjustedPath}`
  }

  return `/api${adjustedPath}`
}

export default class ApiClient {
  constructor(req) {
    methods.forEach(method => {
      this[method] = (path, { params, data } = {}) =>
        new Promise((resolve, reject) => {
          const request = superagent[method](formatUrl(path))

          if (params) request.query(params)

          if (isServer && req.get('cookie')) {
            request.set('cookie', req.get('cookie'))
          }

          if (data) request.send(data)

          request.end((reqError, { body } = {}) =>
            reqError ?
              reject(body || reqError) :
              resolve(body))
        })
    })
  }
}
