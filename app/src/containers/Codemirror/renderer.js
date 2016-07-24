import { Renderer } from 'meta-marked'
import { getLanguage, highlight } from 'highlight.js'

const renderer = new Renderer()

renderer.code = (code, language) => {
  const validLang = !!(language && getLanguage(language))

  const highlighted = validLang ?
    highlight(language, code).value : code

  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`
}

renderer.list = body => {
  const items = body
    .split(/<li>|<\/li>/)
    .filter(s => s !== '')

  let hasCheckbox = false

  const output = items
    .map(i => {
      if (i.match(/^\[x\]\s/) || i.match(/^\[\s\]\s/)) {
        hasCheckbox = true
        return i.match(/^\[x\]\s/) ?
          i.replace(/^\[x\]\s/, '&#9745; ') :
          i.replace(/^\[\s\]\s/, '&#9744; ')
      }
      return i
    })
    .map(i => {
      if (i.match(/\r?\n|\r/)) return i
      return hasCheckbox ?
        `<li style="list-style: none;">${i}</li>` :
        `<li>${i}</li>`
    })

  return output.join('')
}

renderer.link = (href, title, text) =>
  text === 'video-embed' ?
    `
      <div class="video-embed">
        <iframe src="${href}" allowfullscreen class="video-embed__video"></iframe>
      </div>
    ` :
    `<a href="${href}">${text}</a>`

export default renderer
