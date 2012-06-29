var path = require('path')

var buildumb = require('buildumb')

buildumb.build({
  root: path.normalize(path.join(__dirname, '..'))
, modules: {
  // punycode
    'node_modules/punycode/punycode.js': 'punycode'
  // isomorph
  , 'node_modules/isomorph/is.js'     : 'isomorph/is'
  , 'node_modules/isomorph/format.js' : 'isomorph/format'
  , 'node_modules/isomorph/object.js' : 'isomorph/object'
  , 'node_modules/isomorph/url.js'    : 'isomorph/url'
  // Concur
  , 'node_modules/Concur/lib/concur.js': 'Concur'
  // validators
  , 'lib/errors.js'     : './errors'
  , 'lib/ipv6.js'       : './ipv6'
  , 'lib/validators.js' : ['./validators', 'validators']
  }
, exports: {
    'validators': 'validators'
  }
, output: 'validators.js'
, compress: 'validators.min.js'
, header: buildumb.formatTemplate(path.join(__dirname, 'header.js'),
                                  require('../package.json').version)
})
