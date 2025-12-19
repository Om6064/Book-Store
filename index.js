import express from 'express'
import Book from './models/bookModel.js';
import connectDb from './config/db.js';

const app = express()
const PORT = 8000;
connectDb()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    const bookData = await Book.find()
    return res.render('index', {
        bookData,
        thatOneData: null,

    });
})

const handleErrors = (req, res) => {
    if (!req.body.name || req.body.name.trim() === "") {
        res.redirect('/?error=Enter+Name');
        return false
    }

    if (!req.body.author || req.body.author.trim() === "") {
        res.redirect('/?error=Enter+Author');
        return false
    }
return true
}
app.post('/add-book', async (req, res) => {
    if(!handleErrors(req, res))  return
    const newBook = new Book(req.body)
    await newBook.save()
    return res.redirect('/')
})

app.get('/edit-book/:editId', async (req, res) => {
    const { editId } = req.params

    const thatOneData = await Book.findById(editId)
    const bookData = await Book.find()

    return res.render('index', {
        thatOneData,
        bookData,
    })

})
app.post('/edit-book/:editId', async (req, res) => {
    const { editId } = req.params

    await Book.findByIdAndUpdate(editId, req.body)
    return res.redirect('/')

})

app.get('/delete-book/:deleteId', async (req, res) => {
    const { deleteId } = req.params
    await Book.findByIdAndDelete(deleteId)
    return res.redirect('/')
})

app.listen(PORT,(err) => {
    if (err) {
        console.log("Server Error !!");
    }
    console.log(`server is running at https//localhost:${PORT}`);
})