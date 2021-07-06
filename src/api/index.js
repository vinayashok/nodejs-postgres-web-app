const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require('npmlog');
const config = require("../../config/config.json");

const app = express();
const port = process.env.PORT || 8080;

// To support parsing content type application/json
app.use(bodyParser.json());
// To support parsing content type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

let corsOptions = {
  origin: "http://localhost:8081"
}
app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
})

// Set up Postgresql
const db = require('./model');
db.sequelize.sync();

require('./controller/auth') (app, config, logger);
require('./controller/user') (app, config, logger);



app.get("/ping", (req, res) => {
  res.send({ status: "OK", msg: "Pong"});
})

app.all('*', (req, res) => {
  logger.error(`Invalid Route requested by user: ${req.path}`);
  res.status(404).send({
    status: 'Error',
    msg: "Invalid Route"
  });
})


app.listen(port, () => {
  logger.info(`WEB APP API is running on port ${port}`);
})
