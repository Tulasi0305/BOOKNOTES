const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET - Show all books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find().sort({ dateRead: -1 });
        res.render("index", { books });
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).send("Server Error");
    }
});

// GET - Show add book form
router.get("/add", (req, res) => {
    res.render("addBook");
});

// POST - Add new book
router.post("/", async (req, res) => {
    try {
        const { title, author, notes, rating, dateRead } = req.body;
        const book = new Book({
            title,
            author,
            notes,
            rating,
            dateRead
        });
        await book.save();
        res.redirect("/books");
    } catch (err) {
        console.error("Error adding book:", err);
        res.status(500).send("Error adding book");
    }
});

// GET - Show edit book form
router.get("/edit/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.render("editBook", { book });
    } catch (err) {
        console.error("Error fetching book:", err);
        res.status(500).send("Server Error");
    }
});

// PUT - Update book details
router.put("/:id", async (req, res) => {
    try {
        const { title, author, notes, rating, dateRead } = req.body;
        await Book.findByIdAndUpdate(req.params.id, {
            title,
            author,
            notes,
            rating,
            dateRead
        });
        res.redirect("/books");
    } catch (err) {
        console.error("Error updating book:", err);
        res.status(500).send("Error updating book");
    }
});

// DELETE - Delete a book
router.delete("/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect("/books");
    } catch (err) {
        console.error("Error deleting book:", err);
        res.status(500).send("Error deleting book");
    }
});

module.exports = router;
