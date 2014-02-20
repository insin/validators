var path = require('path')

var qqunit = require('qqunit')

global.validators = require('../lib/validators')

var tests = [ 'errors.js'
            , 'ipv6.js'
            , 'validators.js'
            ].map(function(t) { return path.join(__dirname, t) })

qqunit.Runner.run(tests, function(stats) {
  process.exit(stats.failed)
})
