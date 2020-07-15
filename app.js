const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const seedDB = require("./seed");
const createAssociations = require("./config/dbAssociations");

/**Import database initialization configuration */
const db = require("./config/database");

/**Connect to database and configure */
db.authenticate()
    .then(() => {
        console.log(
            "Connection to database has been established successfully."
        );
    })
    .then(async () => {
        //Disable foreign key check to be able to drop tables with foreign_key association
        await db.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });
    })
    .then(async () => {
        //Drop all tables
        await db.drop();
    })
    .then(async () => {
        /**Create database associations */
        await createAssociations();

        /**Create All Tables and sync all Models */
        await db.sync({ force: true });
        console.log("Tables are created");

        /**seed database with dummy data */
        await seedDB();
        console.log("Dummy Data is inserted to database");
    })
    .catch((err) => console.log("Unable to connect to the database:", err));

/**Parse requests as json */
app.use(express.json());

/**Routes */
app.use("/users", userRoutes);
app.use("/books", bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server started on port ${PORT}`);
});
