const Sequelize = require("sequelize");
const db = require("../config/database");

const Book = db.define("Book", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Book;
