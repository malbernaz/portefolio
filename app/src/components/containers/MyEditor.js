import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Codemirror from 'react-codemirror'
import marked from 'meta-marked'

import { posts as postsActions } from '../../actions'

marked.setOptions({
  gfm: true,
  sanitize: true
})

const options = {
  gfm: true,
  lineWrapping: true,
  theme: 'one-light'
}

class MyEditor extends Component {

  static propTypes = {
    posts: PropTypes.object,
    createDraft: PropTypes.func,
    updateDraft: PropTypes.func
  }

  componentDidMount = () => {
    const { createDraft, posts: { raw } } = this.props

    if (typeof window !== undefined) {
      require('codemirror/mode/markdown/markdown') // eslint-disable-line global-require
      options.mode = 'markdown'
    }

    const text = [
      '---',
      'title: my post title',
      'subtitle: a subtle subtitle',
      'tags:',
      '\t- a tag',
      '---\n',
      '## my post title'
    ].join('\n')

    const { meta: { title }, html } = marked(text)
    if (!raw) createDraft(text, title, html)
  }

  handleChange = (text) => {
    const { updateDraft } = this.props
    const { meta: { title }, html } = marked(text)
    updateDraft(text, title, html)
  }

  render() {
    const { posts: { raw } } = this.props

    return (
      <Codemirror
        options={options}
        onChange={this.handleChange}
        value={raw}
      />
    )
  }
}

export default connect(
  state => ({ ...state }),
  dispatch => bindActionCreators({ ...postsActions }, dispatch))(MyEditor)
