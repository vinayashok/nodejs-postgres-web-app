const jwt = require("jsonwebtoken");
const config = require("../../../config/config.json");
const db = require("../model");
const User = db.user;
const logger = require('npmlog');

// Middleware to validate the auth jwt token
verifyAuthToken = async(req, res, next) => {
  const authToken = req.headers["x-authentication-token"];

  if (!authToken) {
    return res.status(403).send({
      message: "authentication token missing"
    });
  }
  let decoded;
  try {
    decoded = await jwt.verify(authToken, config.secret);
  } catch (err) {
    logger.error(`authentication middleware: Failed to verify jwt token ${err}`);
    return res.status(401).send({
      message: "Invalid/expired authentication token!"
    });
  }

  if (!decoded) {
    return res.status(401).send({
      message: "Unauthorized user"
    });
  }
  // Add decoded user id to request object 
  req.userId = decoded.id;
  next();
}

const authentication = {
  verifyAuthToken: verifyAuthToken
};

module.exports = authentication;
