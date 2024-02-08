const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Parse JSON body

// Data
const comments = [
  { id: 1, author: 'John', text: 'First comment!' },
  { id: 2, author: 'Jane', text: 'Nice comment!' },
  { id: 3, author: 'Tom', text: 'I like it!' },
];

// Routes
app.get('/comments', (req, res) => {
  res.send(comments);
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  res.send(comment);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});