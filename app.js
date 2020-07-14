const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const seedDB = require("./seed");
const User = require("./models/User");
const Book = require("./models/Book");

/**Import database initialization configuration */
const db = require("./config/database");

/**Connect to database */
db.authenticate()
    .then(() =>
        console.log("Connection to database has been established successfully.")
    )
    .catch((err) => console.log("Unable to connect to the database:", err));

/**Create Tables */

User.sync().then(() => {
    console.log("Users Table created");
});

Book.sync().then(() => {
    console.log("Books Table created");
});

/**seed database with dummy data */
seedDB();

/**Parse requests as json */
app.use(express.json());

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server started on port ${PORT}`);
});
