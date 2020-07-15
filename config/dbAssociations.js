const BorrowedBook = require("../models/BorrowedBook");
const ReturnedBook = require("../models/ReturnedBook");
const Book = require("../models/Book");
const User = require("../models/User");

const createAssociations = async () => {
    User.hasMany(BorrowedBook, { foreignKey: "user_id" });
    User.hasMany(ReturnedBook, { foreignKey: "user_id" });
    ReturnedBook.hasOne(Book, { foreignKey: "id", sourceKey: "book_id" });
    BorrowedBook.hasOne(Book, { foreignKey: "id", sourceKey: "book_id" });
};

module.exports = createAssociations;
