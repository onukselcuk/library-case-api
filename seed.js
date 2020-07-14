const User = require("./models/User");
const Book = require("./models/Book");

const userNames = [
    "Eray Aslan",
    "Enes Faruk Meniz",
    "Sefa Eren Şahin",
    "Kadir Mutlu"
];

const bookNames = [
    "The Hitchhiker's Guide to the Galaxy",
    "I, Robot",
    "Dune",
    "1984",
    "Brave New World"
];

const seedDB = async () => {
    User.destroy({ truncate: true });
    Book.destroy({ truncate: true });

    for (let i = 0; i < userNames.length; i++) {
        await User.create({ name: userNames[i] });
    }

    for (let i = 0; i < bookNames.length; i++) {
        await Book.create({ name: bookNames[i] });
    }
};

module.exports = seedDB;
