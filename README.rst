==========================
Validators |travis_status|
==========================

.. |travis_status| image:: https://secure.travis-ci.org/insin/validators.png
   :target: http://travis-ci.org/insin/validators

Validators which can be shared between browsers and `Node.js`_, based on
`Django`_'s core validators.

Validators are Functions which take a value and throw a ``ValidationError`` if
they detect that it is invalid.

Browsers:

* `validators.js`_ / `validators.min.js`_

Node.js::

   npm install validators

.. _`Node.js`: http://nodejs.org/
.. _`Django`: https://www.djangoproject.com/
.. _`validators.js`: https://raw.github.com/insin/validators/master/validators.js
.. _`validators.min.js`: https://raw.github.com/insin/validators/master/validators.min.js

Error
=====

``ValidationError(messages[, {code: null, params: null}])``
-----------------------------------------------------------

Validation error constructor.

For customisation purposes, in addition to a validation message, a
``ValidationError`` may specify a ``code`` to itentify the category of error and
any ``params`` which were inserted into the validation message, when applicable.

For ``messages``, you can pass:

* a single message as a String
* a list of messages
* an object containing field-specific messages, with properties corresponding to
  field names.

Utilities
=========

``EMPTY_VALUES``
----------------

Defines input values for which a field is considered to be empty. These are:

* ``null``
* ``undefined``
* ``''``

Validators
==========

``RegexValidator(options)``
---------------------------

Creates a validator which validates that input matches a regular expression.

Options which can be passed are:

* ``regex`` -- the regular expression pattern to search for the provided value,
  or a pre-compiled ``RegExp``.  By default, matches any string (including an
  empty string)
* ``message`` -- the error message used by ``ValidationError`` if validation
  fails. Defaults to ``"Enter a valid value"``.
* ``code`` -- the error code used by ``ValidationError`` if validation fails.
  Defaults to ``"invalid"``.
* ``inverseMatch`` -- the match mode for ``regex``. Defaults to ``false``.

``URLValidator(options)``
-------------------------

Creates a validator which validates that input looks like a valid URL.

Options which can be passed are:

* ``schemes`` -- allowed URL schemes. Defaults to
  ``['http', 'https', 'ftp', 'ftps']``.

``EmailValidator(options)``
---------------------------

Creates a validator which validates that input looks like a valid e-mail
address.

Options which can be passed are:

* ``message`` -- error message to be used in any generated ``ValidationError``.
* ``code`` -- error code to be used in any generated ``ValidationError``.
* ``whitelist`` -- a whitelist of domains which are allowed to be the only thing
  to the right of the ``@`` in a valid email address -- defaults to
  ``['localhost']``.

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

Copyright (c) 2014, Jonathan Buchanan

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
