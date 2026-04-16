const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

let pages = [];

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/pages', (req, res) => {
  res.json(pages);
});

app.post('/api/pages', (req, res) => {
  const { text } = req.body;

  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const page = {
    id: Date.now().toString(),
    text: text.trim(),
    createdAt: new Date().toISOString()
  };

  pages.unshift(page);
  res.status(201).json(page);
});

app.listen(PORT, () => {
  console.log(`Hello Pages backend running at http://localhost:${PORT}`);
});
