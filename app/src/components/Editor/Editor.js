import React, { Component, PropTypes } from 'react'
import { Editor as DraftEditor, EditorState, ContentState, Modifier } from 'draft-js'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './Editor.scss'

const { createFromText } = ContentState
const { createWithContent } = EditorState

class Editor extends Component {
  static propTypes = {
    activeDraft: PropTypes.shape({ raw: PropTypes.string }),
    creatingActiveDraft: PropTypes.bool,
    updateActiveDraft: PropTypes.func
  }

  state = {
    editorState: createWithContent(createFromText(this.props.activeDraft.raw))
  }

  componentDidMount () {
    System.import('./Renderer.worker')
      .then(Worker => {
        this.rendererWorker = new Worker()
        this.rendererWorker.addEventListener('message', this.markdownReceiver, false)
      })
  }

  componentWillReceiveProps ({ activeDraft, creatingActiveDraft }) {
    if (creatingActiveDraft) {
      this.setState({ editorState: createWithContent(createFromText(activeDraft.raw)) })
    }
  }

  componentWillUnmount () {
    this.rendererWorker.removeEventListener('message', this.markdownReceiver, false)
  }

  onTab = e => {
    e.preventDefault()

    const currentState = this.state.editorState
    const newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      '  '
    )

    this.setState({
      editorState: EditorState.push(currentState, newContentState, 'insert-characters')
    })

    this.rendererWorker.postMessage({
      raw: this.state.editorState.getCurrentContent().getPlainText()
    })
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

    return (
      <DraftEditor
        editorState={ editorState }
        onChange={ this.handleChange }
        onTab={ this.onTab }
      />
    )
  }
}

export default withStyles(s)(Editor)
