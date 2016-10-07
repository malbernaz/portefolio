import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import * as messageActions from '../../actions/message'
import s from './MessageNotifier.scss'

const mapStateToProps = state => ({
  message: state.message
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ...messageActions
}, dispatch)

@withStyles(s)
@connect(mapStateToProps, mapDispatchToProps)
export default class MessageNotifier extends Component {
  static propTypes = {
    message: PropTypes.shape({
      isShown: PropTypes.bool,
      content: PropTypes.string
    }),
    dissmissMessage: PropTypes.func
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.message.isShown) {
      this.dissmissOnTimeout()
    }
  }

  dissmissOnTimeout = () => {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout)
    }

    this.messageTimeout = setTimeout(this.props.dissmissMessage, 4000)
  }

  render () {
    return (
      <div className={ this.props.message.isShown ? s.isShown : s.root }>
        <span>{ this.props.message.content }</span>
      </div>
    )
  }
}
