# Library API

## Description

---

This app provides a REST API connected to a relational database for managing a library's users and book operations.

## Features

---

-   List Users
-   Access to a user's name, the books borrowed in the past and current borrows
-   Create Users
-   List Books
-   Access to a book's information along with its average user score
-   Create a new book
-   Borrow a book
-   Return and score a book

## Run The App

---

1. Make sure MySQL database is active and running.
2. Run below sql code in MySQL shell with root privileges. It create a user and a database named "library". You can change the user name and password, if you do so, you need to change database user name and password inside `.env` file.

```sql
CREATE USER 'selcuk'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON * . * TO 'selcuk'@'localhost';
FLUSH PRIVILEGES;
CREATE DATABASE library;
```

3. Run below code in terminal on project's directory.

```javascript
npm install
npm run start
```

4. Once you run the app, database connection will be established, database tables will be created and dummy data will be inserted to database automatically on the background.

5. Now you can thinker with the code and test it with Postman.
