const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory book storage
let books = [
  { id: 1, title: 'The Merchant of Venice', author: 'William Shakespeare' },
  { id: 2, title: 'A Tale of Two Cities', author: 'Charles Dicken' }
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  book.title = title || book.title;
  book.author = author || book.author;
  res.json(book);
});

// DELETE book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);

  // Remove the book
  books = books.filter(book => book.id !== bookId);

  // Reassign sequential IDs
  books = books.map((book, index) => ({
    ...book,
    id: index + 1
  }));

  res.json({ message: 'Book deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
