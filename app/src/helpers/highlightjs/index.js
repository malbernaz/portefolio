var hljs = require('./highlight');

// hljs.registerLanguage('xml', require('./languages/xml'));
// hljs.registerLanguage('bash', require('./languages/bash'));
hljs.registerLanguage('clojure', require('./languages/clojure'));
// hljs.registerLanguage('css', require('./languages/css'));
hljs.registerLanguage('markdown', require('./languages/markdown'));
// hljs.registerLanguage('diff', require('./languages/diff'));
hljs.registerLanguage('dockerfile', require('./languages/dockerfile'));
hljs.registerLanguage('ruby', require('./languages/ruby'));
// hljs.registerLanguage('go', require('./languages/go'));
// hljs.registerLanguage('http', require('./languages/http'));
hljs.registerLanguage('javascript', require('./languages/javascript'));
hljs.registerLanguage('json', require('./languages/json'));
hljs.registerLanguage('elm', require('./languages/elm'));
// hljs.registerLanguage('nginx', require('./languages/nginx'));
// hljs.registerLanguage('php', require('./languages/php'));
hljs.registerLanguage('python', require('./languages/python'));
// hljs.registerLanguage('rust', require('./languages/rust'));
hljs.registerLanguage('scss', require('./languages/scss'));
hljs.registerLanguage('sql', require('./languages/sql'));
// hljs.registerLanguage('swift', require('./languages/swift'));
hljs.registerLanguage('yaml', require('./languages/yaml'));
// hljs.registerLanguage('typescript', require('./languages/typescript'));

module.exports = hljs;
