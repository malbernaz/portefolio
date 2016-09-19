import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Editor, EditorState, ContentState } from 'draft-js'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import * as postsActions from '../../actions/posts'
import RedendererWorker from './Renderer.worker'
import s from './Codemirror.scss'

class Codemirror extends Component {
  static propTypes = {
    posts: PropTypes.object,
    updateActiveDraft: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      editorState:
        EditorState.createWithContent(ContentState.createFromText(props.posts.activeDraft.raw))
    }

    if (typeof window === 'object') {
      this.rendererWorker = new RedendererWorker()
    }
  }

  componentDidMount () {
    this.rendererWorker.addEventListener('message', this.markdownReceiver, false)
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

    return <Editor onChange={ this.handleChange } editorState={ editorState } />
  }
}

export default connect(
  state => ({
    ...state
  }),
  dispatch => bindActionCreators({
    ...postsActions
  }, dispatch)
)(withStyles(s)(Codemirror))
