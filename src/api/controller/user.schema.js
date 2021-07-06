module.exports = {};

module.exports['GET /users'] = {
  'x-authentication-token': {
    in: ["header"],
    isString: true,
    notEmpty: true
  }
}

module.exports['PUT /users'] = {
  'x-authentication-token': {
    in: ["header"],
    isString: true,
    notEmpty: true
  },
  firstName: {
    in: ["body"],
    errorMessage: 'firstName invalid type',
    isString: true,
    trim: true,
    optional: true
  },
  lastName: {
    in: ["body"],
    errorMessage: 'lastName invalid type',
    isString: true,
    trim: true,
    optional: true
  }
}
