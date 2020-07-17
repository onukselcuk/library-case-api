const BorrowedBook = require("../models/BorrowedBook");
const ReturnedBook = require("../models/ReturnedBook");
const Book = require("../models/Book");
const User = require("../models/User");

//Creates associations between tables
const createAssociations = async () => {
    await User.hasMany(BorrowedBook, { foreignKey: "user_id" });
    await User.hasMany(ReturnedBook, { foreignKey: "user_id" });
    await ReturnedBook.hasOne(Book, { foreignKey: "id", sourceKey: "book_id" });
    await BorrowedBook.hasOne(Book, { foreignKey: "id", sourceKey: "book_id" });
};

module.exports = createAssociations;
