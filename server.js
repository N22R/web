const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let books = [];

app.get("/books", (req, res) => {
  let result = [...books];


  const query = req.query.q?.toLowerCase();
  if (query) {
    result = result.filter(b =>
      b.title.toLowerCase().includes(query) ||
      b.author.toLowerCase().includes(query)
    );
  }

  const sort = req.query.sort;
  const order = req.query.order === "desc" ? -1 : 1;
  if (sort === "price") {
    result.sort((a, b) => (a.price - b.price) * order);
  } else if (sort === "pages") {
    result.sort((a, b) => (a.pages - b.pages) * order);
  }

  res.json(result);
});

app.post("/books", (req, res) => {
  const newBook = { id: Date.now(), ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  books[index] = { id, ...req.body };
  res.json(books[index]);
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.status(204).end();
});

app.listen(3000, () => {
  console.log("📚 Book API running on http://localhost:3000");
});