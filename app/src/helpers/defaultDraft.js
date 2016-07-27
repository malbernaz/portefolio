export default {
  raw: [
    '---',
    'title: my post title',
    'description: a subtle description',
    'tags:',
    '  - a tag',
    '  - open source',
    '---\n'
  ].join('\n'),
  meta: {
    title: 'my post title',
    description: 'a subtle description',
    tags: ['a tag', 'open source']
  },
  html: '',
  isPublished: false,
  isSaved: false
}
