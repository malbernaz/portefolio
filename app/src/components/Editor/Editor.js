import React, { Component, PropTypes } from 'react'
import { Editor as DraftEditor, EditorState, ContentState } from 'draft-js'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './Editor.scss'

const { createFromText } = ContentState
const { createWithContent } = EditorState

class Editor extends Component {
  static propTypes = {
    activeDraft: PropTypes.object,
    creatingActiveDraft: PropTypes.bool,
    updateActiveDraft: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = { editorState: createWithContent(createFromText(props.activeDraft.raw)) }
  }

  componentDidMount () {
    System.import('./Renderer.worker')
      .then(module => {
        const RedendererWorker = module.default

        this.rendererWorker = new RedendererWorker()
      })

    this.rendererWorker.addEventListener('message', this.markdownReceiver, false)
  }

  componentWillReceiveProps ({ activeDraft, creatingActiveDraft }) {
    if (creatingActiveDraft) {
      this.setState({ editorState: createWithContent(createFromText(activeDraft.raw)) })
    }
  }

  componentWillUnmount () {
    this.rendererWorker.removeEventListener('message', this.markdownReceiver, false)
  }

  markdownReceiver = e => {
    e.preventDefault()

    const { updateActiveDraft } = this.props
    const { editorState } = this.state

    updateActiveDraft({
      html: e.data,
      raw: editorState.getCurrentContent().getPlainText()
    })
  }

  handleChange = editorState => {
    this.setState({ editorState })

    this.rendererWorker.postMessage({
      raw: editorState.getCurrentContent().getPlainText()
    })
  }

  render () {
    const { editorState } = this.state

    return <DraftEditor onChange={ this.handleChange } editorState={ editorState } />
  }
}

export default withStyles(s)(Editor)
