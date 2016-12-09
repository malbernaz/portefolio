import React, { Component, PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './Editor.scss'

@withStyles(s)
export default class Editor extends Component {
  static propTypes = {
    activeDraft: PropTypes.shape({ raw: PropTypes.string }).isRequired,
    editorFocused: PropTypes.bool.isRequired,
    switchEditorFocus: PropTypes.func.isRequired,
    updateActiveDraft: PropTypes.func.isRequired
  }

  componentDidMount () {
    const Worker = require('../../helpers/Renderer.worker') // eslint-disable-line global-require

    this.rendererWorker = new Worker()
    this.rendererWorker.addEventListener('message', this.markdownReceiver, false)
  }

  componentWillReceiveProps ({ editorFocused }) {
    if (editorFocused) {
      this.editor.focus()
    }

    if (!editorFocused) {
      this.editor.blur()
    }
  }

  componentWillUnmount () {
    this.rendererWorker.removeEventListener('message', this.markdownReceiver, false)
  }

  markdownReceiver = e => {
    const { updateActiveDraft } = this.props

    if (this.timeout) clearTimeout(this.timeout)

    this.timeout = setTimeout(() => updateActiveDraft({ html: e.data }), 1000)
  }

  handleKeyDown = e => {
    if (e.keyCode === 9) {
      e.preventDefault()

      const { updateActiveDraft } = this.props

      const { selectionStart, selectionEnd, value } = e.target

      const newValue = `${value.substring(0, selectionStart)}  ${value.substring(selectionEnd)}`

      updateActiveDraft({ raw: newValue })

      setTimeout(() => {
        this.editor.selectionStart = this.editor.selectionEnd = selectionStart + 2
      }, 0)

      this.rendererWorker.postMessage({ raw: newValue })
    }
  }

  handleChange = e => {
    const { updateActiveDraft } = this.props

    const raw = e.target.value

    updateActiveDraft({ raw })

    this.rendererWorker.postMessage({ raw })
  }

  handleEditorFocus = ({ type }) => {
    const { editorFocused, switchEditorFocus } = this.props

    switch (type) {
      case 'focus':
        if (!editorFocused) switchEditorFocus(true)
        break
      case 'blur':
        if (editorFocused) switchEditorFocus(false)
        break
      default:
        break
    }
  }

  render () {
    return (
      <div className={ s.root }>
        <textarea
          className={ s.content }
          onBlur={ this.handleEditorFocus }
          onChange={ this.handleChange }
          onFocus={ this.handleEditorFocus }
          onKeyDown={ this.handleKeyDown }
          ref={ c => { this.editor = c } }
          value={ this.props.activeDraft.raw }
        />
      </div>
    )
  }
}
