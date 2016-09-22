import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import * as messageActions from '../../actions/message'
import s from './MessageNotifier.scss'

const MessageNotifier = ({ message, dissmissMessage }) => {
  const dissmissOnTimeout = () => setTimeout(dissmissMessage, 4000)

  const render = () => {
    if (message.isShown) dissmissOnTimeout()

    return (
      <div className={ message.isShown ? s.isShown : s.root }>
        <span>{ message.content }</span>
      </div>
    )
  }

  return render()
}

MessageNotifier.propTypes = {
  message: PropTypes.object,
  dissmissMessage: PropTypes.func
}

export default connect(
  state => ({ message: state.message }),
  dispatch => bindActionCreators({
    ...messageActions
  }, dispatch)
)(withStyles(s)(MessageNotifier))
