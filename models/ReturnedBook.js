const Sequelize = require("sequelize");
const db = require("../config/database");

const ReturnedBook = db.define(
    "Returned_Book",
    {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        book_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "books",
                key: "id"
            }
        },
        score: Sequelize.FLOAT
    },
    { timestamps: false }
);

module.exports = ReturnedBook;
