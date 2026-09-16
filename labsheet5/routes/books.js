const express = require("express");

const router = express.Router();

let books = [
    {
        id: 1,
        title: "JavaScript Basics",
        author: "John Smith"
    },
    {
        id: 2,
        title: "Node.js Guide",
        author: "David Brown"
    },
    {
        id: 3,
        title: "Express.js",
        author: "Mike Johnson"
    }
];

// GET /api/books
router.get("/", (req, res) => {
    res.json(books);
});

// GET /api/books/:id
router.get("/:id", (req, res, next) => {

    const id = Number(req.params.id);

    const book = books.find(
        book => book.id === id
    );

    if (!book) {
        const error = new Error("Book not found");
        error.status = 404;
        return next(error);
    }

    res.json(book);
});

// POST /api/books
router.post("/", (req, res) => {

    const { title, author } = req.body;

    const newBook = {
        id: books.length > 0
            ? Math.max(...books.map(book => book.id)) + 1
            : 1,
        title,
        author
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});

// PUT /api/books/:id
router.put("/:id", (req, res, next) => {

    const id = Number(req.params.id);

    const book = books.find(
        book => book.id === id
    );

    if (!book) {
        const error = new Error("Book not found");
        error.status = 404;
        return next(error);
    }

    const { title, author } = req.body;

    if (title !== undefined) {
        book.title = title;
    }

    if (author !== undefined) {
        book.author = author;
    }

    res.json({
        message: "Book updated successfully",
        book
    });
});

// DELETE /api/books/:id
router.delete("/:id", (req, res, next) => {

    const id = Number(req.params.id);

    const index = books.findIndex(
        book => book.id === id
    );

    if (index === -1) {
        const error = new Error("Book not found");
        error.status = 404;
        return next(error);
    }

    const deletedBook = books.splice(index, 1)[0];

    res.json({
        message: "Book deleted successfully",
        book: deletedBook
    });
});

module.exports = router;