const userService = require("../service/user");
const { checkSchema, validationResult } = require("express-validator");
const schema = require("./user.schema");
const { verifyAuthToken } = require("../middleware/authentication");


module.exports = (app, config, logger) => {
  // API to list all users
  app.get("/api/v1/users", [checkSchema(schema['GET /users']), verifyAuthToken], async(req, res) => {
    try {
      // Validate API schema
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
      const users = await userService(config, logger).listUsers();
      return res.status(200).send({
        users: users
      });
    } catch(err) {
      logger.error(`User Controller: Failed to list all users ${err}`);
      return res.status(500).send({ message: err.message || err });
    }
  });

  // API to update user details
  app.put("/api/v1/users", [checkSchema(schema['PUT /users']), verifyAuthToken], async(req, res) => {
    try {
      // Validate API schema
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
      const params = {
        userId: req.userId,
        firstName: req.body["firstName"],
        lastName: req.body["lastName"]
      }
      await userService(config, logger).updateUser(params);
      return res.status(200).send();
    } catch(err) {
      logger.error(`User Controller: Failed to list all users ${err}`);
      return res.status(500).send({ message: err.message || err });
    }
  });
}
