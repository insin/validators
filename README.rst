==========================
Validators |travis_status|
==========================

.. |travis_status| image:: https://secure.travis-ci.org/insin/validators.png
   :target: http://travis-ci.org/insin/validators

Validators which can be shared between browsers and `Node.js`_.

Validators are either Functions or Objects with a ``__call__()`` function, which
take a value and throw a ``ValidationError`` if they detect that it is invalid.

The ``__call__()`` form is a workaround for the fact that only Function objects
are callable in JavaScript.

Browsers:

* `validators.js`_

Node.js::

   npm install validators

.. _`Node.js`: http://nodejs.org
.. _`validators.js`: https://raw.github.com/insin/validators/master/validators.js

Error
=====

``ValidationError(messages[, {code: null, params: null}])``
-----------------------------------------------------------

Validation error constructor.

For customisation purposes, in addition to a validation message, a
ValidationError may specify a ``code`` to itentify the category of error and any
``params`` which were inserted into the validation message, when applicable.

Utilities
=========

``EMPTY_VALUES``
----------------

Defines input values for which a field is considered to be empty. These are:

* ``null``
* ``undefined``
* ``''``

``isEmptyValue(value)``
-----------------------

Convenience function for checking if a value is strictly one of
``EMPTY_VALUES``.

``isCallable(obj)``
-------------------

Returns ``true`` if the given object is a Function or an Object with a
``__call__()`` Function.

``callValidator(validator, value)``
-----------------------------------

Calls a validator with a value - this utility function is provided to ensure
code which needs to work with validators doesn't need to care how they're
defined.

Validators
==========

``RegexValidator(regex, message, code)``
----------------------------------------

Creates a validator which walidates that input matches a regular expression.

``URLValidator()``
--------------------------

Creates a validator which validates that input looks like a valid URL.

``EmailValidator(regex, message, code)``
----------------------------------------

Creates a validator which validates that input looks like a valid e-mail
address.

``validateEmail(value)``
------------------------

Validates that input looks like a valid URL -- this is a preconfigured instance
of a ``URLValidator``,

``validateEmail(value)``
------------------------

Validates that input looks like a valid e-mail address -- this is a
preconfigured instance of an ``EmailValidator``,

``validateSlug(value)``
-----------------------

Validates that input is a valid slug.

``validateIPv4Address(value)``
------------------------------

Validates that input is a valid IPv4 address.

``validateIPv6Address(value)``
------------------------------

Validates that input is a valid IPv6 address.

``validateIPv46Address(value)``
------------------------------

Validates that input is a valid IPv4 or IPv6 address.

``ipAddressValidators(protocol[, unpackIPv4])``
-----------------------------------------------

Returns the appropriate validator for validating IPv4 or IPv6 addresses, passing
``'ipv4'``, ``'ipv6'``, or ``'both'`` as ``protocol``.

If a truthy ``unpackIPv4`` argument is given and ``protocol`` is not ``'both'``,
an ``Error`` will be thrown.

``validateCommaSeparatedIntegerList(value)``
--------------------------------------------

Validates that input is a comma-separated list of integers.

``BaseValidator(limitValue)``
-----------------------------

Base constructor for validators which compare input against a given value.

``MaxValueValidator(limitValue)``
---------------------------------

Validates that input is less than or equal to a given value.

``MinValueValidator(limitValue)``
---------------------------------

Validates that input is greater than or equal to a given value.

``MaxLengthValidator(limitValue)``
----------------------------------

Validates that input is at least a given length.

``MinLengthValidator(limitValue)``
----------------------------------

Validates that input is at most a given length.

Additional IPv6 Functions
=========================

``ipv6.isValidIPv6Address(value)``
------------------------------------

Returns ``true`` if input is a valid IPv6 address, ``false`` otherwise.

``ipv6.cleanIPv6Address(value[, {errorMessage: '...', unpackIPv4: false}])``
----------------------------------------------------------------------------

Cleans an IPv6 address string -- replaces the longest continious zero-sequence
with '::' and removes leading zeroes and makes sure all hextets are lowercase.

If an invalid address is passed, a ``ValidationError`` is thrown.

MIT License
===========

Copyright (c) 2012, Jonathan Buchanan

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
