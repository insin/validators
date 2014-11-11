0.3.1 / 2014-11-11
==================

* Updated dependencies.

0.3.0 / 2014-02-26
==================

* Constructors of validators implemented as instances with a ``__call__()``
  function in their prototype now return ``__call__()`` bound to the instance.
  This gets rid of the ``isCallable()`` / ``callValidator()`` machinery.

* Removed ``isEmptyValue()`` -- just use ``Array.prototype.indexOf()``

0.2.3 / 2014-02-23
==================

* The default error message in ``cleanIPv6Address()`` was missing a full stop at
  the end.

0.2.2 / 2014-02-23
==================

* Made ``validateIPv46Address()`` throw a ValidationError with its own message
  when IPv6 validation fails.

0.2.1 / 2014-02-21
==================

* Fixed slug validation ``RegExp``.

* Moved conditional output of ValidationError messages as an error object or
  list into ``ValidationError#__iter__()``.

0.2.0 / 2014-02-20
==================

* **Backwards-incompatible change** -- ValidationError messages are now accessed
  using a ``#messages()`` function rather than a ``messages`` property.

* ValidationErrors can now be created with an object containing field-specific
  error messages.

* Added an ``#updateErrorObj(errorObj)`` function to ValidationError which
  passes its error messags along to the given object.

* ValidationErrors now formats messages with any configured parameters when
  returning messages.

0.1.0 / 2014-02-19
==================

* **Backwards-incompatible change** -- RegexValidator and EmailValidator now
  take a configuration object as their only argument, rather than individual
  configuration arguments.

* **Backwards-incompatible change** -- removed the pre-configured URLValidator
  instance, validateURL.

* Added an inverseMatch option for RegexValidator.

* Added a whitelist option for EmailValidator, for specifying whitelisted
  domains.

* Added a schemes option for URLValidator, which now takes a configuration
  object argument.

0.0.3 / 2012-06-29
==================

* Updated to isomorph 0.2.

0.0.2 / 2012-03-08
==================

* Fixed overwriting of url module variable after validating an IDNA domain.

0.0.1 / 2012-03-08
==================

* Added validateURL, since URLValidator no longer takes configuration params.
* Extracted validators from `newforms`_ for reuse across projects.

.. _`newforms`: https://github.com/insin/newforms
