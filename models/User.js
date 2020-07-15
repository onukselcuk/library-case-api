const Sequelize = require("sequelize");
const db = require("../config/database");

/**Define Users Table */
const User = db.define(
    "User",
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    { timestamps: false }
);

module.exports = User;
