import superagent from 'superagent'
import config from '../config'

const methods = ['del', 'get', 'patch', 'post', 'put']

const isServer = typeof window !== 'object'

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path

  if (isServer) {
    return `http://${config.apiHost}:${config.apiPort}/api${adjustedPath}`
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

          if (req && req.get('cookie') && isServer) {
            request.set('cookie', req.get('cookie'))
          }

          if (data) request.send(data)

          request.end((reqError, { body } = {}) => reqError ?
            reject(body || reqError) :
            resolve(body))
        })
    })
  }
}
