const User = require("./models/User");
const Book = require("./models/Book");
const BorrowedBook = require("./models/BorrowedBook");
const ReturnedBook = require("./models/ReturnedBook");

const userNames = [
    "Eray Aslan",
    "Enes Faruk Meniz",
    "Sefa Eren Şahin",
    "Kadir Mutlu"
];

const books = [
    { name: "The Hitchhiker's Guide to the Galaxy" },
    { name: "I, Robot", score: 5.33 },
    { name: "Dune" },
    { name: "1984" },
    { name: "Brave New World" }
];

const borrowedBooks = [
    { userId: 3, bookId: 5 },
    { userId: 2, bookId: 1 },
    { userId: 1, bookId: 3 }
];

const returnedBooks = [
    { userId: 2, bookId: 3, userScore: 5 },
    { userId: 2, bookId: 4, userScore: 10 },
    { userId: 3, bookId: 4, userScore: 4 }
];

const seedDB = async () => {
    try {
        for (let i = 0; i < userNames.length; i++) {
            await User.create({ name: userNames[i] });
        }

        for (let i = 0; i < books.length; i++) {
            await Book.create({
                name: books[i].name,
                score: books[i].score ? books[i].score : -1
            });
        }

        for (let i = 0; i < borrowedBooks.length; i++) {
            await BorrowedBook.create({
                user_id: borrowedBooks[i].userId,
                book_id: borrowedBooks[i].bookId
            });
        }

        for (let i = 0; i < returnedBooks.length; i++) {
            await ReturnedBook.create({
                user_id: returnedBooks[i].userId,
                book_id: returnedBooks[i].bookId,
                score: returnedBooks[i].userScore
            });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = seedDB;
