const express = require("express");
const router = express.Router();
const User = require("../models/User");
const BorrowedBook = require("../models/BorrowedBook");
const ReturnedBook = require("../models/ReturnedBook");
const Book = require("../models/Book");
const { Op } = require("sequelize");
const { check, validationResult } = require("express-validator");

/**Getting user list with ids and names */
router.get("/", (req, res) => {
    User.findAll({ attributes: ["id", "name"] })
        .then((users) => {
            //If user doesn't exist, this returns an error
            if (!users) {
                return res.status(404).json({ error: "No users exist" });
            }
            res.status(200).json(users);
        })
        .catch((err) => res.status(500).json({ error: err }));
});

/**Getting a user with no borrow history */
router.get("/:userId", (req, res) => {
    const userId = req.params.userId;

    User.findAll({
        where: { id: userId },
        include: [
            {
                model: BorrowedBook,
                include: [{ model: Book, attributes: ["name"] }]
            },
            {
                model: ReturnedBook,
                include: [{ model: Book, attributes: ["name", "score"] }]
            }
        ]
    })
        .then(async (userData) => {
            //If user doesn't exist, this returns an error
            if (!userData) {
                return res.status(404).json({
                    error: "User doesn't exist"
                });
            }

            const borrowedBooksArray = userData[0].Borrowed_Books.map(
                (current) => {
                    return {
                        name: current.Book.name
                    };
                }
            );

            const returnedBooksArray = userData[0].Returned_Books.map(
                (current) => {
                    return {
                        name: current.Book.name,
                        userScore: current.score
                    };
                }
            );

            res.status(200).json({
                id: userData[0].id,
                name: userData[0].name,
                past: returnedBooksArray,
                present: borrowedBooksArray
            });
        })
        .catch((err) =>
            res.status(500).json({ error: err, msg: "User doesn't exist" })
        );
});

/**Create User */

router.post(
    "/",
    // check with express-validator
    [check("name", "Name field needs to be a string").isString()],
    async (req, res) => {
        //check if there is any validation errors
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() });
        }

        const name = req.body.name;
        try {
            await User.create({ name });
            res.sendStatus(201);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
);

/**User borrow book */

router.post("/:userId/borrow/:bookId", async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        //checks if user exist
        await User.findOne({
            where: { id: userId }
        }).then((user) => {
            if (!user) {
                return res.status(404).json({ error: "User doesn't exist" });
            }
        });

        // checks if the book exist
        await Book.findOne({
            where: { id: bookId }
        }).then((book) => {
            if (!book) {
                return res.status(404).json({ error: "Book doesn't exist" });
            }
        });

        // checks if the book is borrowed by someone else.
        await BorrowedBook.findOne({
            where: { book_id: bookId }
        }).then((borrowedBook) => {
            if (borrowedBook) {
                return res.status(409).json({
                    error:
                        "This book is already borrowed by someone else, please try borrowing it later"
                });
            }
        });

        // create a record of the borrowed book
        await BorrowedBook.create({ user_id: userId, book_id: bookId });

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error });
    }
});

/**User return book*/
router.post(
    "/:userId/return/:bookId",
    // check with express-validator
    [check("score", "Score field needs to be in float type").isFloat()],
    async (req, res) => {
        // check if there is any validation errors.
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() });
        }

        const { userId, bookId } = req.params;
        const score = req.body.score;

        try {
            //check if user exists
            await User.findOne({
                where: { id: userId }
            }).then((user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ error: "User doesn't exist" });
                }
            });
            //check if book exists
            await Book.findOne({
                where: { id: bookId }
            }).then((book) => {
                if (!book) {
                    return res
                        .status(404)
                        .json({ error: "Book doesn't exist" });
                }
            });
            //check if the book already returned or never borrowed
            await BorrowedBook.findOne({
                where: {
                    [Op.and]: [{ book_id: bookId }, { user_id: userId }]
                }
            }).then((borrowedBook) => {
                if (!borrowedBook) {
                    return res.status(404).json({
                        error:
                            "This book is already returned or never borrowed by you."
                    });
                }
            });

            //since book is returned, this removes the book from borrowed books.
            await BorrowedBook.destroy({
                where: {
                    [Op.and]: [{ book_id: bookId }, { user_id: userId }]
                }
            });

            //create a record of the book returned along with user's score
            await ReturnedBook.create({
                user_id: userId,
                book_id: bookId,
                score
            });

            //find all return records of the book
            await ReturnedBook.findAll({
                where: {
                    book_id: bookId
                }
            })
                .then((bookReturns) => {
                    //calculate average score of the book
                    let totalScore = 0;
                    bookReturns.forEach((current) => {
                        totalScore += current.score;
                    });

                    const averageScore = totalScore / bookReturns.length;

                    return averageScore;
                })
                .then(async (avgScore) => {
                    // update book's average score
                    await Book.update(
                        { score: avgScore },
                        { where: { id: bookId } }
                    );
                });

            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
);

module.exports = router;
