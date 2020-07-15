const Sequelize = require("sequelize");
const db = require("../config/database");

/**Define Borrowed_Books Table */
const BorrowedBook = db.define(
    "Borrowed_Book",
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
        }
    },
    { timestamps: false }
);

module.exports = BorrowedBook;
