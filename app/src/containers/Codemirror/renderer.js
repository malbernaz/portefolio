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
      if (i.match(/\r?\n|\r/)) return i
      if (i.match(/^\[x\]\s/) || i.match(/^\[\s\]\s/)) {
        hasCheckbox = true
        return i.match(/^\[x\]\s/) ?
          ({ text: i.replace(/^\[x\]\s/, ''), checked: 'checked' }) :
          ({ text: i.replace(/^\[\s\]\s/, ''), checked: '' })
      }
      return i
    })
    .map(i => {
      if (typeof i !== 'object' && i.match(/\r?\n|\r/)) return i
      return hasCheckbox ?
        `<li style="list-style: none;">
          <input type="checkbox" disabled ${i.checked}>
            &nbsp;&nbsp;${i.text}
          </input>
        </li>` :
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
