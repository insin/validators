QUnit.module("validators")

QUnit.test("validators", 131, function() {
  var now = new Date(90000)
  var later = new Date(100000)
  var earlier = new Date(80000)
  var extendedSchemes = ['http', 'https', 'ftp', 'ftps', 'git', 'file']

  var tests = [
    [validators.validateEmail, "email@here.com", null]
  , [validators.validateEmail, "weirder-email@here.and.there.com", null]
  , [validators.validateEmail, "email@[127.0.0.1]", null]
  , [validators.validateEmail, "example@valid-----hyphens.com", null]
  , [validators.validateEmail, "example@valid-with-hyphens.com", null]
  , [validators.validateEmail, "test@domain.with.idn.tld.उदाहरण.परीक्षा", null]
  , [validators.validateEmail, "email@localhost", null]
  , [validators.EmailValidator({whitelist: ['localdomain']}), "email@localdomain", null]
  , [validators.validateEmail, '"test@test"@example.com', null]

  , [validators.validateEmail, null, validators.ValidationError]
  , [validators.validateEmail, "", validators.ValidationError]
  , [validators.validateEmail, "abc", validators.ValidationError]
  , [validators.validateEmail, 'abc@', validators.ValidationError]
  , [validators.validateEmail, 'abc@bar', validators.ValidationError]
  , [validators.validateEmail, "a @x.cz", validators.ValidationError]
  , [validators.validateEmail, 'abc@.com', validators.ValidationError]
  , [validators.validateEmail, "something@@somewhere.com", validators.ValidationError]
  , [validators.validateEmail, "email@127.0.0.1", validators.ValidationError]
  , [validators.validateEmail, 'example@invalid-.com', validators.ValidationError]
  , [validators.validateEmail, 'example@-invalid.com', validators.ValidationError]
  , [validators.validateEmail, 'example@inv-.alid-.com', validators.ValidationError]
  , [validators.validateEmail, 'example@inv-.-alid.com', validators.ValidationError]
  , [validators.validateEmail, 'test@example.com\n\n<script src="x.js">', validators.ValidationError]
  // Quoted-string format (CR not allowed)
  , [validators.validateEmail, '"\\\011"@here.com', null]
  , [validators.validateEmail, '"\\\012"@here.com', validators.ValidationError]
  , [validators.validateEmail, 'trailingdot@shouldfail.com.', validators.ValidationError]

  , [validators.validateSlug, "slug-ok", null]
  , [validators.validateSlug, "longer-slug-still-ok", null]
  , [validators.validateSlug, "--------", null]
  , [validators.validateSlug, "nohyphensoranything", null]

  , [validators.validateSlug, "", validators.ValidationError]
  , [validators.validateSlug, " text ", validators.ValidationError]
  , [validators.validateSlug, " ", validators.ValidationError]
  , [validators.validateSlug, "some@mail.com", validators.ValidationError]
  , [validators.validateSlug, "你好", validators.ValidationError]
  , [validators.validateSlug, "\n", validators.ValidationError]

  , [validators.validateIPv4Address, "1.1.1.1", null]
  , [validators.validateIPv4Address, "255.0.0.0", null]
  , [validators.validateIPv4Address, "0.0.0.0", null]

  , [validators.validateIPv4Address, "256.1.1.1", validators.ValidationError]
  , [validators.validateIPv4Address, "25.1.1.", validators.ValidationError]
  , [validators.validateIPv4Address, "25,1,1,1", validators.ValidationError]
  , [validators.validateIPv4Address, "25.1 .1.1", validators.ValidationError]

  , [validators.validateIPv6Address, 'fe80::1', null]
  , [validators.validateIPv6Address, '::1', null]
  , [validators.validateIPv6Address, '1:2:3:4:5:6:7:8', null]

  , [validators.validateIPv6Address, '1:2', validators.ValidationError]
  , [validators.validateIPv6Address, '::zzz', validators.ValidationError]
  , [validators.validateIPv6Address, '12345::', validators.ValidationError]

  , [validators.validateIPv46Address, '1.1.1.1', null]
  , [validators.validateIPv46Address, '255.0.0.0', null]
  , [validators.validateIPv46Address, '0.0.0.0', null]
  , [validators.validateIPv46Address, 'fe80::1', null]
  , [validators.validateIPv46Address, '::1', null]
  , [validators.validateIPv46Address, '1:2:3:4:5:6:7:8', null]

  , [validators.validateIPv46Address, '256.1.1.1', validators.ValidationError]
  , [validators.validateIPv46Address, '25.1.1.', validators.ValidationError]
  , [validators.validateIPv46Address, '25,1,1,1', validators.ValidationError]
  , [validators.validateIPv46Address, '25.1 .1.1', validators.ValidationError]
  , [validators.validateIPv46Address, '1:2', validators.ValidationError]
  , [validators.validateIPv46Address, '::zzz', validators.ValidationError]
  , [validators.validateIPv46Address, '12345::', validators.ValidationError]

  , [validators.validateCommaSeparatedIntegerList, "1", null]
  , [validators.validateCommaSeparatedIntegerList, "1,2,3", null]
  , [validators.validateCommaSeparatedIntegerList, "1,2,3,", null]

  , [validators.validateCommaSeparatedIntegerList, "", validators.ValidationError]
  , [validators.validateCommaSeparatedIntegerList, "a,b,c", validators.ValidationError]
  , [validators.validateCommaSeparatedIntegerList, "1, 2, 3", validators.ValidationError]

  , [validators.MaxValueValidator(10), 10, null]
  , [validators.MaxValueValidator(10), -10, null]
  , [validators.MaxValueValidator(10), 0, null]
  , [validators.MaxValueValidator(now), now, null]
  , [validators.MaxValueValidator(now), earlier, null]

  , [validators.MaxValueValidator(0), 1, validators.ValidationError]
  , [validators.MaxValueValidator(now), later, validators.ValidationError]

  , [validators.MinValueValidator(-10), -10, null]
  , [validators.MinValueValidator(-10), 10, null]
  , [validators.MinValueValidator(-10), 0, null]
  , [validators.MinValueValidator(1), now, null]
  , [validators.MinValueValidator(now), later, null]

  , [validators.MinValueValidator(0), -1, validators.ValidationError]

  , [validators.MaxLengthValidator(10), "", null]
  , [validators.MaxLengthValidator(10), "xxxxxxxxxx", null]

  , [validators.MaxLengthValidator(10), "xxxxxxxxxxxxxxx", validators.ValidationError]

  , [validators.MinLengthValidator(10), "xxxxxxxxxxxxxxx", null]
  , [validators.MinLengthValidator(10), "xxxxxxxxxxxxxxx", null]

  , [validators.MinLengthValidator(10), "", validators.ValidationError]

  , [validators.URLValidator(), "http://www.djangoproject.com/", null]
  , [validators.URLValidator(), "HTTP://WWW.DJANGOPROJECT.COM/", null]
  , [validators.URLValidator(), "http://localhost/", null]
  , [validators.URLValidator(), "http://example.com/", null]
  , [validators.URLValidator(), "http://www.example.com/", null]
  , [validators.URLValidator(), "http://www.example.com:8000/test", null]
  , [validators.URLValidator(), "http://valid-with-hyphens.com/", null]
  , [validators.URLValidator(), "http://subdomain.example.com/", null]
  , [validators.URLValidator(), "http://200.8.9.10/", null]
  , [validators.URLValidator(), "http://200.8.9.10:8000/test", null]
  , [validators.URLValidator(), "http://valid-----hyphens.com/", null]
  , [validators.URLValidator(), "http://example.com?something=value", null]
  , [validators.URLValidator(), "http://example.com/index.php?something=value&another=value2", null]
  , [validators.URLValidator(), "https://www.example.com/", null]
  , [validators.URLValidator(), "ftp://www.example.com/", null]
  , [validators.URLValidator(), "ftps://www.example.com/", null]
  , [validators.URLValidator(), "http://עברית.idn.icann.org/", null]
  , [validators.URLValidator({schemes: extendedSchemes}), "file://localhost/path", null]
  , [validators.URLValidator({schemes: extendedSchemes}), "git://example.com/", null]

  , [validators.URLValidator(), "foo", validators.ValidationError]
  , [validators.URLValidator(), "http://", validators.ValidationError]
  , [validators.URLValidator(), "http://example", validators.ValidationError]
  , [validators.URLValidator(), "http://example.", validators.ValidationError]
  , [validators.URLValidator(), "http://.com", validators.ValidationError]
  , [validators.URLValidator(), "http://invalid-.com", validators.ValidationError]
  , [validators.URLValidator(), "http://-invalid.com", validators.ValidationError]
  , [validators.URLValidator(), "http://inv-.alid-.com", validators.ValidationError]
  , [validators.URLValidator(), "http://inv-.-alid.com", validators.ValidationError]
  , [validators.URLValidator(), "file://localhost/path", validators.ValidationError]
  , [validators.URLValidator(), "git://example.com/", validators.ValidationError]
  , [validators.URLValidator({schemes: extendedSchemes}), "git://-invalid.com", validators.ValidationError]

  , [validators.BaseValidator(true), true, null]
  , [validators.BaseValidator(true), false, validators.ValidationError]

  , [validators.RegexValidator(), "", null]
  , [validators.RegexValidator(), "x1x2", null]
  , [validators.RegexValidator({regex: ".*"}), "", null]
  , [validators.RegexValidator({regex: /.*/}), "", null]
  , [validators.RegexValidator({regex: ".*"}), "xxxxx", null]

  , [validators.RegexValidator({regex: "x"}), "y", validators.ValidationError]
  , [validators.RegexValidator({regex: /x/}), "y", validators.ValidationError]
  , [validators.RegexValidator({regex: 'x', inverseMatch: true}), 'y', null]
  , [validators.RegexValidator({regex: /x/, inverseMatch: true}), 'y', null]
  , [validators.RegexValidator({regex: 'x', inverseMatch: true}), 'x', validators.ValidationError]
  , [validators.RegexValidator({regex: /x/, inverseMatch: true}), 'x', validators.ValidationError]
  ]

  for (var i =0, l = tests.length; i < l; i++) {
    var t = tests[i]
    var validator = t[0]
    var value = t[1]
    var error = t[2]
    if (error === null) {
      validator(value)
      ok(true, "valid value '" + value + "' shouldn't throw")
    }
    else {
      throws(function() { validator(value) }, "invalid value '" + value + "' should throw")
    }
  }
})
