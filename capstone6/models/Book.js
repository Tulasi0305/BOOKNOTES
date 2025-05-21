const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    notes: String,
    rating: Number,
    dateRead: Date
});

module.exports = mongoose.model("Book", BookSchema);
