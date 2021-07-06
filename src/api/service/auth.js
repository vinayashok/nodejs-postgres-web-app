const db = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (config, logger) => {

  const User = db.user;

  const signup = async(props) => {
    try {
      // Create user in db
      const user = await User.create({
        email: props.email,
        password: bcrypt.hashSync(props.password, 8),
        firstName: props.firstName,
        lastName: props.lastName
      });
      // Generate token for new user
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 3600
      });
      return token;
    } catch(err) {
      logger.error(`Auth Service: Failed to register user: ${err}`);
      throw err;
    }
  };

  const login = async(props) => {
    try {
      // Validate if user exists in db
      const user = await User.findOne({
        where: {
          email: props.email
        }
      });
      // If user does not exist return error
      if (!user) {
        throw new Error('User Not found');
      }
      // Validate if password entered in valid
      const isPasswordValid = bcrypt.compareSync(props.password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid Password');
      }
      // Generate jwt token for signed in user
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 3600
      });
      return token;
    } catch(err) {
      logger.error(err.stack);
      logger.error(`Auth Service: User failed to login: ${err}`);
      throw err;
    }
  };

  return {
    signup,
    login
  }
}
