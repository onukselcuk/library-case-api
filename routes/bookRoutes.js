const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

/**Getting book list */
router.get("/", (req, res) => {
    Book.findAll({ attributes: ["id", "name"] })
        .then((books) => {
            res.status(200).json(books);
        })
        .catch((err) => res.status(500).json({ error: err }));
});

/**Getting a book with its average user score */
router.get("/:bookId", (req, res) => {
    const bookId = req.params.bookId;

    Book.findOne({ where: { id: bookId }, attributes: ["id", "name"] })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
