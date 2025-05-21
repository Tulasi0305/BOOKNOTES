const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();
const PORT = 3000;

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/bookNotesDB", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Book Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    notes: String,
    rating: Number,
    dateRead: Date
});

const Book = mongoose.model("Book", bookSchema);

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// 🏠 Route: Home Page (Display Books)
app.get("/", async (req, res) => {
    const books = await Book.find();
    res.render("index", { books });
});

// ➕ Route: Add a New Book
app.post("/add", async (req, res) => {
    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        notes: req.body.notes,
        rating: req.body.rating,
        dateRead: req.body.dateRead
    });
    await newBook.save();
    res.redirect("/");
});

// 📝 Route: Edit Page
app.get("/edit/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.render("edit", { book });
});

// 🔄 Route: Update Book
app.post("/update/:id", async (req, res) => {
    await Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        author: req.body.author,
        notes: req.body.notes,
        rating: req.body.rating,
        dateRead: req.body.dateRead
    });
    res.redirect("/");
});

// ❌ Route: Delete Book
app.post("/delete/:id", async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
