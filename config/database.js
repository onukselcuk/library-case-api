const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

module.exports = new Sequelize(
    "library",
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: "localhost",
        dialect: "mysql"
    }
);
