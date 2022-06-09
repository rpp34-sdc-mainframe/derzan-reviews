const express = require('express');
const db = require('./dbquery.js');
const app = express();
app.use(express.json());

app.get('/reviews', async (req, res) => {
  // localhost:8000/reviews?product_id=5
  const {product_id, sort, count} = req.query;
  try {
    let xd = await db.getReviews(product_id, sort, count)
    res.send(JSON.stringify(xd));
  } catch(e) {
    res.sendStatus(500);
  }
});


app.get('/reviews/meta', async (req, res) => {
  const {product_id} = req.query;
  try {
    let xd = await db.getMetadata(product_id)
    res.send(JSON.stringify(xd));
  } catch(e) {
    res.sendStatus(500);
  }
});

module.exports = app;