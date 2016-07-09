import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { default as ReactCodemirror } from 'react-codemirror'
import marked from 'meta-marked'

import { posts as postsActions } from '../../actions'

marked.setOptions({
  gfm: true
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

class Codemirror extends Component {
  static propTypes = {
    posts: PropTypes.object,
    updateActiveDraft: PropTypes.func
  }

  handleChange = (raw) => {
    const { updateActiveDraft } = this.props
    const { meta, html } = marked(raw)

    updateActiveDraft({ raw, meta, html })
  }

  render() {
    const { posts: { activeDraft: { raw } } } = this.props

    return (
      <ReactCodemirror
        options={ options }
        onChange={ this.handleChange }
        value={ raw }
      />
    )
  }
}

export default connect(
  state => ({ ...state }),
  dispatch => bindActionCreators({ ...postsActions }, dispatch))(Codemirror)
