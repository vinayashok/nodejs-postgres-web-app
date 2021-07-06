module.exports = {};

module.exports['POST /signup'] = {
  email: {
    isEmail: true,
    in: ["body"],
    normalizeEmail: true,
    errorMessage: 'Email id invalid/missing',
    trim: true,
    notEmpty: true
  },
  password: {
    in: ["body"],
    isString: true,
    isLength: {
      errorMessage: 'Password should be atleast 8 characters long.',
      options: {
        min: 8,
        max: 20
      }
    },
    notEmpty: true
  },
  firstName: {
    in: ["body"],
    errorMessage: 'firstName invalid/missing',
    isString: true,
    trim: true,
    notEmpty: true
  },
  lastName: {
    in: ["body"],
    errorMessage: 'lastName invalid/missing',
    isString: true,
    trim: true,
    notEmpty: true
  }
};

module.exports['POST /login'] = {
  email: {
    isEmail: true,
    in: ["body"],
    normalizeEmail: true,
    errorMessage: 'Email id invalid/missing',
    trim: true,
    notEmpty: true
  },
  password: {
    in: ["body"],
    isString: true,
    isLength: {
      errorMessage: 'Password should be atleast 8 characters long.',
      options: {
        min: 8,
        max: 20
      }
    },
    notEmpty: true
  }
};
