const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const { check, validationResult } = require("express-validator");

/**Getting book list */
router.get("/", (req, res) => {
    Book.findAll({ attributes: ["id", "name"] })
        .then((books) => {
            // If there are no books,this returns an error
            if (!books) {
                return res.status(404).json({ error: "No books exist" });
            }
            res.status(200).json(books);
        })
        .catch((err) => res.status(500).json({ error: err }));
});

/**Getting a book with its average user score */
router.get("/:bookId", (req, res) => {
    const bookId = req.params.bookId;

    Book.findOne({ where: { id: bookId }, attributes: ["id", "name", "score"] })
        .then((book) => {
            // If the book doesn't exist in the library,this returns an error
            if (!book) {
                return res.status(404).json({ error: "Book doesn't exist" });
            }

            res.status(200).json(book);
        })
        .catch((err) => res.status(500).json({ error: err }));
});

/**Create Book */
router.post(
    "/",
    // check with express-validator
    [check("name", "Name field needs to be a string").isString()],
    async (req, res) => {
        // check if there is any validation errors
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() });
        }

        const name = req.body.name;
        try {
            //Creates a book
            await Book.create({ name });
            res.sendStatus(201);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
);

module.exports = router;
