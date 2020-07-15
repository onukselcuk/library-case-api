const Sequelize = require("sequelize");
const db = require("../config/database");

/**Define Books Table */
const Book = db.define(
    "Book",
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        score: {
            type: Sequelize.FLOAT,
            defaultValue: -1
        }
    },
    { timestamps: false }
);

module.exports = Book;
