import React, { Component, PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './Editor.scss'

@withStyles(s)
export default class Editor extends Component {
  static propTypes = {
    activeDraft: PropTypes.shape({ raw: PropTypes.string }),
    updateActiveDraft: PropTypes.func
  }

  componentDidMount () {
    System.import('../../helpers/Renderer.worker')
      .then(Worker => {
        this.rendererWorker = new Worker()
        this.rendererWorker.addEventListener('message', this.markdownReceiver, false)
      })
  }

  componentWillUnmount () {
    this.rendererWorker.removeEventListener('message', this.markdownReceiver, false)
  }

  markdownReceiver = e => {
    const { updateActiveDraft } = this.props

    updateActiveDraft({ html: e.data })
  }

  handleKeyDown = e => {
    if (e.keyCode === 9) {
      e.preventDefault()
    }
  }

  handleChange = e => {
    const { updateActiveDraft } = this.props

    const raw = e.target.value

    updateActiveDraft({ raw })

    this.rendererWorker.postMessage({ raw })
  }

  render () {
    return (
      <div className={ s.root }>
        <div className={ s.container }>
          <textarea
            className={ s.content }
            onKeyDown={ this.handleKeyDown }
            onChange={ this.handleChange }
            value={ this.props.activeDraft.raw }
            ref={ c => { this.editor = c } }
          />
        </div>
      </div>
    )
  }
}
