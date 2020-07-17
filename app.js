const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const seedDB = require("./seed");
const createAssociations = require("./config/dbAssociations");

//Import database initialization configuration
const db = require("./config/database");

//Connect to database and configure
db.authenticate()
    .then(() => {
        console.log(
            "Connection to database has been established successfully."
        );
    })
    .then(() => {
        //Disable foreign key check to be able to drop tables with foreign_key association
        return db.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });
    })
    .then(() => {
        //Create database associations
        return createAssociations();
    })
    .then(() => {
        console.log("Database associations are created");
        //Create All Tables and sync all Models
        return db.sync({ force: true });
    })
    .then(() => {
        console.log("Tables are created");
        //seed database with dummy data
        return seedDB();
    })
    .then(() => {
        console.log("Dummy Data is inserted to database");
    })
    .catch((err) => console.log("Unable to connect to the database:", err));

//Parse requests as json
app.use(express.json());

//Routes
app.use("/users", userRoutes);
app.use("/books", bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server started on port ${PORT}`);
});
