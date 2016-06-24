import {
  SHOW_MESSAGE,
  DISSMISS_MESSAGE
} from '../constants'

export const showMessage = message => ({ type: SHOW_MESSAGE, message })

export const dissmissMessage = () => ({ type: DISSMISS_MESSAGE })
