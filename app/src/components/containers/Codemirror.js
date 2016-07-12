import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactCodemirror from 'react-codemirror'
import marked, { Renderer } from 'meta-marked'
import hljs from 'highlight.js'

import { posts as postsActions } from '../../actions'

const renderer = new Renderer()

renderer.code = (code, language) => {
  const validLang = !!(language && hljs.getLanguage(language))

  const highlighted = validLang ? hljs.highlight(language, code).value : code

  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`
}

marked.setOptions({
  gfm: true,
  renderer
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

  componentDidMount() {
    require('codemirror/mode/gfm/gfm') // eslint-disable-line
    options.mode = 'gfm'
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
        ref="editor"
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
