const Sequelize = require("sequelize");
console.log(`HELLO ENV: ${process.env}`);
console.log(process.env);
const sequelize = new Sequelize(
  process.env.DB_SCHEMA || 'postgres',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    operatorAliases: false,
    pool: {
      max: parseInt(process.env.POOL_MAX) || 5,
      min: parseInt(process.env.POOL_MIN) || 0,
      acquire: parseInt(process.env.POOL_ACQUIRE) || 30000,
      idle: parseInt(process.env.POOL_IDLE) || 10000
    }
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user.js")(sequelize, Sequelize);

module.exports = db;
