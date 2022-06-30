const express = require('express');
const cors = require('cors')
const db = require('./dbquery.js');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

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

app.put('/reviews/:review_id/helpful', async (req, res) => {
  const review_id = req.params.review_id;
  try {
    let xd = await db.markHelpful(review_id);
    res.sendStatus(200)
  } catch(e) {
    res.sendStatus(500);
  }
});

app.put('/reviews/:review_id/report', async (req, res) => {
  const review_id = req.params.review_id;
  try {
    let xd = await db.report(review_id);
    res.sendStatus(200)
  } catch(e) {
    res.sendStatus(500);
  }
});

app.post('/reviews', async (req, res) => {
  const {product_id, rating, summary, body, recommend, name, email, photos, characteristics} = req.body;
  console.log(product_id, rating, summary, body, recommend, name, email, photos, characteristics)
  try {
    let xd = await db.addReview(product_id, rating, summary, body, recommend, name, email, photos, characteristics);
    res.sendStatus(200)
  } catch(e) {
    res.sendStatus(500);
  }
})

app.get('/loaderio-8205e2362d61ba83640cba3183ab8f13', (req, res) => {
  res.sendFile('loader.txt', {root: path.join(__dirname)})
})

module.exports = app;