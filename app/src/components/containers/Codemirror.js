import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactCodemirror from 'react-codemirror'
import marked, { Renderer } from 'meta-marked'
import { getLanguage, highlight } from 'highlight.js'

import * as postsActions from '../../actions/posts'

const renderer = new Renderer()

renderer.code = (code, language) => {
  const validLang = !!(language && getLanguage(language))

  const highlighted = validLang ?
    highlight(language, code).value : code

  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`
}

renderer.link = (href, title, text) => text === 'video-embed' ?
  `
    <div class="video-embed">
      <iframe src="${href}" allowfullscreen class="video-embed__video"></iframe>
    </div>
  ` :
  `<a href="${href}">${text}</a>`

marked.setOptions({
  gfm: true,
  sanitize: true,
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
