var Concur = require('Concur')
  , is = require('isomorph/lib/is')
  , object = require('isomorph/lib/object')

/**
 * A validation error, containing a list of messages. Single messages
 * (e.g. those produced by validators may have an associated error code
 * and parameters to allow customisation by fields.
 */
var ValidationError = Concur.extend({
  constructor: function(message, kwargs) {
    if (!(this instanceof ValidationError)) return new ValidationError(message, kwargs)
    kwargs = object.extend({code: null, params: null}, kwargs)
    if (is.Array(message)) {
      this.messages = message
    }
    else {
      this.code = kwargs.code
      this.params = kwargs.params
      this.messages = [message]
    }
  }
})

ValidationError.prototype.toString = function() {
  return ('ValidationError: ' + this.messages.join('; '))
}

module.exports = {
  ValidationError: ValidationError
}
