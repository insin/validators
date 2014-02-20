QUnit.module('errors')

void function() {

var ValidationError = validators.ValidationError

QUnit.test('ValidationError', 17, function() {
  // Creating as a single message
  var e = ValidationError('Test')
  deepEqual(e.messages(), ['Test'])
  throws(function() { e.messageObj() })

  // Single messages can contain parameters which will be interpolated
  e = ValidationError('Test {param}', {params: {param: 'Works'}})
  deepEqual(e.messages(), ['Test Works'])
  throws(function() { e.messageObj() })

  // Single messages can have an associated code, which will be stored
  e = ValidationError('Test', {code: 'invalid'})
  equal(e.code, 'invalid')

  // Creating as a list of messages
  e = ValidationError(['Test'])
  deepEqual(e.messages(), ['Test'])
  throws(function() { e.messageObj() })

  e = ValidationError(['Test 1', 'Test 2'])
  deepEqual(e.messages(), ['Test 1', 'Test 2'])
  throws(function() { e.messageObj() })

  // Creating as an object containing field-specific messages
  e = ValidationError({
    field1: 'Stuff is bad'
  , field2: 'More stuff is bad'
  })
  deepEqual(e.messages(), ['Stuff is bad', 'More stuff is bad'])
  deepEqual(e.messageObj(), {
    field1: ['Stuff is bad']
  , field2: ['More stuff is bad']
  })

  e = ValidationError({
    field1: ['Stuff is bad']
  , field2: ['More stuff is bad']
  })
  deepEqual(e.messages(), ['Stuff is bad', 'More stuff is bad'])
  deepEqual(e.messageObj(), {
    field1: ['Stuff is bad']
  , field2: ['More stuff is bad']
  })

  e = ValidationError({
    field1: ['Stuff is bad']
  , field2: ['More stuff is bad']
  })
  deepEqual(e.messages(), ['Stuff is bad', 'More stuff is bad'])
  deepEqual(e.messageObj(), {
    field1: ['Stuff is bad']
  , field2: ['More stuff is bad']
  })

  // Validation errors can pass their field-specific messages along to another
  // object.
  var e1 = ValidationError({
    field1: 'Stuff is bad'
  , field2: 'More stuff is bad'
  })
  var e2 = ValidationError({
    field1: 'Oh-oh'
  , field3: 'Bad things have happened'
  })
  var errors = {}
  e1.updateErrorObj(errors)
  e2.updateErrorObj(errors)
  deepEqual(ValidationError(errors).messageObj(), {
    field1: ['Stuff is bad', 'Oh-oh']
  , field2: ['More stuff is bad']
  , field3: ['Bad things have happened']
  })

  // If a ValidationError isn't for a specific field, it'll add its messages to
  // the special non-field errors property.
  errors = {}
  e = ValidationError(['Some', 'Things'])
  e.updateErrorObj(errors)
  deepEqual(ValidationError(errors).messageObj(), {
    __all__: ['Some', 'Things']
  })
})

}()