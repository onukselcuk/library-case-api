const express = require("express");
const router = express.Router();
const User = require("../models/User");

/**Getting user list with ids and names */
router.get("/", (req, res) => {
    User.findAll({ attributes: ["id", "name"] })
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => res.status(500).json({ error: err }));
});

/**Getting a user with no borrow history */
router.get("/:userId", (req, res) => {
    const userId = req.params.userId;

    User.findOne({ where: { id: userId }, attributes: ["id", "name"] })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
