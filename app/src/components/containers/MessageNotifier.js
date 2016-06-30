import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { message as messageActions } from '../../actions'

const MessageNotifier = ({ message, dissmissMessage }) => {
  const dissmissOnTimeout = () => setTimeout(dissmissMessage, 4000)

  const render = () => {
    if (message.isShown) dissmissOnTimeout()

    return (
      <div className={ message.isShown ? 'message-notifier isShown' : 'message-notifier' }>
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

export default connect(({ message }) => ({
  message
}), dispatch => bindActionCreators({
  ...messageActions
}, dispatch))(MessageNotifier)

// export default MessageNotifier
