export default function clientMiddleware(client) {
  return ({ getState, dispatch }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    const { promise, types, ...rest } = action

    if (!promise) return next(action)

    const [REQUEST, SUCCESS, FAILURE] = types

    next({ ...rest, type: REQUEST })

    const actionPromise = promise(client)

    actionPromise.then(
      result => next({ ...rest, result, type: SUCCESS }),
      error => next({ ...rest, error, type: FAILURE })
    ).catch(err => {
      console.error('MIDDLEWARE ERROR:', err)
      next({ ...rest, err, type: FAILURE })
    })

    return actionPromise
  }
}
