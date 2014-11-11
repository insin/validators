'use strict';

// HACK: requiring './validators' here makes the circular import in ipv6.js work
//       after browserification.
module.exports = require('./validators')