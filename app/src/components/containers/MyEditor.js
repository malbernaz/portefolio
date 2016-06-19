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
  theme: 'one-light',
  extraKeys: {
    Tab: cm => {
      const spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
      cm.replaceSelection(spaces)
    }
  }
}

class MyEditor extends Component {
  static propTypes = {
    posts: PropTypes.object,
    updateDraft: PropTypes.func
  }

  handleChange = (raw) => {
    const { updateDraft } = this.props
    const { meta, html } = marked(raw)

    updateDraft({ raw, meta, html })
  }

  render() {
    const { posts: { draft: { raw } } } = this.props

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
