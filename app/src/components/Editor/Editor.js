import React, { Component, PropTypes } from 'react'
import {
  ContentState,
  Editor as DraftEditor,
  EditorState,
  Modifier
} from 'draft-js'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './Editor.scss'

const { createFromText } = ContentState
const { createWithContent, push } = EditorState

@withStyles(s)
export default class Editor extends Component {
  static propTypes = {
    activeDraft: PropTypes.shape({ raw: PropTypes.string }),
    creatingActiveDraft: PropTypes.bool,
    updateActiveDraft: PropTypes.func
  }

  state = {
    editorState: createWithContent(createFromText(this.props.activeDraft.raw)),
    clientReady: false
  }

  componentDidMount () {
    System.import('../../helpers/Renderer.worker')
      .then(Worker => {
        this.rendererWorker = new Worker()
        this.rendererWorker.addEventListener('message', this.markdownReceiver, false)
      })

    this.setState({ clientReady: true }) // eslint-disable-line
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

    this.handleChange(push(currentState, newContentState, 'insert-characters'))
  }

  markdownReceiver = e => {
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
    return (
      <div className={ this.state.clientReady ? s.rootIsShown : s.root }>
        { this.state.clientReady ?
          <DraftEditor
            editorState={ this.state.editorState }
            onChange={ this.handleChange }
            onTab={ this.onTab }
          /> : '' }
      </div>
    )
  }
}
