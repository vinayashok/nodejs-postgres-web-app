const db = require("../model");
const User = db.user;

// Middleware to validate if email is unique
validateEmailExists = async(req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (user) {
    res.status(400).send({
      message: `Email ${req.body.email} already in use`
    })
    return;
  }
  next();
}

const validateSignup = {
  validateEmailExists: validateEmailExists
}
module.exports = validateSignup;
