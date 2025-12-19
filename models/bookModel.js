import mongoose from "mongoose";
const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    isBestSeller: {
        type: String,
    },
    format: {
        type: String,
        required: true
    }
})

const Book = new mongoose.model('Book', bookSchema);
export default Book