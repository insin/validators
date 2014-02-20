0.2.0 / 2014-02-20
==================

* **Backwards-incompatible change** -- ValidationError messages are now accessed
  using a .messages() method rather than a .messages property.

* ValidationErrors can now be created with an object containing field-specific
  error messages.

* Added an ``updateErrorObj(errorObj)`` method to ValidationError which passes
  its error messags along to the given object.

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
