const authService = require("../service/auth");
const { checkSchema, validationResult } = require("express-validator");
const schema = require("./auth.schema");
const { validateEmailExists } = require("../middleware/validateSignup");

module.exports = (app, config, logger) => {

  app.post("/api/v1/signup", [checkSchema(schema['POST /signup']), validateEmailExists], async(req, res) => {
    try {
      // Validate API schema
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
      const params = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      };
      const token = await authService(config, logger).signup(params);
      return res.status(200).send({
        token: token
      })
    } catch(err) {
      logger.error(`Auth Controller: Failed to register user ${err}`);
      return res.status(500).send({ message: err.message || err });
    }
  });


  app.post("/api/v1/login", checkSchema(schema['POST /login']), async(req,res) => {
    try {
      // Validate API schema
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
      const params = {
        email: req.body.email,
        password: req.body.password
      };
      const token = await authService(config, logger).login(params);
      return res.status(200).send({
        token: token
      })
    } catch(err) {
      logger.error(`Auth Controller: Failed to login ${err}`);
      const status = err.message === 'User Not found' ? 404 : err.message === 'Invalid Password' ? 401 : null;
      return res.status(status || 500).send({ message: err.message || err });
    }
  });
}
