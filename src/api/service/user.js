const db = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (config, logger) => {

  const User = db.user;

  const listUsers = async() => {
    try {
      // Create user in db
      const users = await User.findAll({attributes: ['email', 'firstName', 'lastName']});
      return users;
    } catch(err) {
      logger.error(`User Service: Failed to list all users: ${err}`);
      throw err;
    }
  };

  const updateUser = async(props) => {
    try {
      // Find user record and update details
      const userInfo = await User.findByPk(props.userId);
      if (!userInfo) {
        throw 'User does not exist. Please signup.'
      }
      const user = await userInfo.update({
        firstName: props.firstName,
        lastName: props.lastName
      });
      if (!user) {
        throw 'Failed to update user details'
      }
    } catch(err) {
      logger.error(`User Service: Failed to update user info: ${err}`);
      throw err;
    }
  }

  return {
    listUsers,
    updateUser
  }
}
