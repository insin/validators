QUnit.module("validators")

QUnit.test("validators", 100, function() {
  var now = new Date(90000)
  var later = new Date(100000)
  var earlier = new Date(80000)

  var tests = [
    [validators.validateEmail, "email@here.com", null]
  , [validators.validateEmail, "weirder-email@here.and.there.com", null]
  , [validators.validateEmail, "email@[127.0.0.1]", null]
  , [validators.validateEmail, null, validators.ValidationError]
  , [validators.validateEmail, "", validators.ValidationError]
  , [validators.validateEmail, "abc", validators.ValidationError]
  , [validators.validateEmail, "a @x.cz", validators.ValidationError]
  , [validators.validateEmail, "something@@somewhere.com", validators.ValidationError]
  , [validators.validateEmail, "email@127.0.0.1", validators.ValidationError]

  // Quoted-string format (CR not allowed)
  , [validators.validateEmail, '"\\\011"@here.com', null]
  , [validators.validateEmail, '"\\\012"@here.com', validators.ValidationError]

  , [validators.validateSlug, "slug-ok", null]
  , [validators.validateSlug, "longer-slug-still-ok", null]
  , [validators.validateSlug, "--------", null]
  , [validators.validateSlug, "nohyphensoranything", null]
  , [validators.validateSlug, "", validators.ValidationError]
  , [validators.validateSlug, " text ", validators.ValidationError]
  , [validators.validateSlug, " ", validators.ValidationError]
  , [validators.validateSlug, "some@mail.com", validators.ValidationError]
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
  , [validators.validateURL, "http://www.djangoproject.com/", null]
  , [validators.validateURL, "ftp://www.djangoproject.com/", null]
  , [validators.validateURL, "http://localhost/", null]
  , [validators.validateURL, "http://example.com/", null]
  , [validators.validateURL, "http://www.example.com/", null]
  , [validators.validateURL, "http://www.example.com:8000/test", null]
  , [validators.validateURL, "http://valid-with-hyphens.com/", null]
  , [validators.validateURL, "http://subdomain.example.com/", null]
  , [validators.validateURL, "http://200.8.9.10/", null]
  , [validators.validateURL, "http://200.8.9.10:8000/test", null]
  , [validators.validateURL, "http://valid-----hyphens.com/", null]
  , [validators.validateURL, "http://example.com?something=value", null]
  , [validators.validateURL, "http://example.com/index.php?something=value&another=value2", null]
  , [validators.validateURL, "http://עברית.idn.icann.org/", null]

  , [validators.validateURL, "foo", validators.ValidationError]
  , [validators.validateURL, "http://", validators.ValidationError]
  , [validators.validateURL, "http://example", validators.ValidationError]
  , [validators.validateURL, "http://example.", validators.ValidationError]
  , [validators.validateURL, "http://.com", validators.ValidationError]
  , [validators.validateURL, "http://invalid-.com", validators.ValidationError]
  , [validators.validateURL, "http://-invalid.com", validators.ValidationError]
  , [validators.validateURL, "http://inv-.alid-.com", validators.ValidationError]

  , [validators.BaseValidator(true), true, null]
  , [validators.BaseValidator(true), false, validators.ValidationError]

  , [validators.RegexValidator(".*"), "", null]
  , [validators.RegexValidator(/.*/), "", null]
  , [validators.RegexValidator(".*"), "xxxxx", null]

  , [validators.RegexValidator("x"), "y", validators.ValidationError]
  , [validators.RegexValidator(/x/), "y", validators.ValidationError]
  ]

  for (var i =0, l = tests.length; i < l; i++) {
    var a = tests[i]
    if (a[2] === null) {
      validators.callValidator(a[0], a[1])
      ok(true, "valid value '" + a[1] + "' shouldn't raise")
    }
    else {
      raises(function() { validators.callValidator(a[0], a[1]); }, "invalid value '" + a[1] + "' should raise")
    }
  }
})
