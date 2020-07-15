const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

/**Creates a Sequelize instance to mysql database */
module.exports = new Sequelize(
    "library",
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: "localhost",
        dialect: "mysql"
    }
);
