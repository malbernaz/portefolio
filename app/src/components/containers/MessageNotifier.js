import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreator } from 'redux'

import { message as messageActions } from '../../actions'

const MessageNotifier = ({ message, dissmissMessage }) => {
  const dissmissOnTimeout = (time) => setTimeout(dissmissMessage(), time)

  const render = () => {
    if (message.isShown) dissmissOnTimeout(4000)

    return (
      <div className={ message.isShown ? 'message-notifier isShown' : 'message-notifier' }>
        { message }
      </div>
    )
  }

  return render()
}

MessageNotifier.propTypes = {
  message: PropTypes.string.isRequired,
  dissmissMessage: PropTypes.func
}

export default connect(({
  message
}) => ({
  message
}),
  dispatch => bindActionCreator({
    ...messageActions
  }, dispatch)
)(MessageNotifier)
