const express = require('express');
const db = require('./dbquery.js');
const app = express();
const port = 8000;
app.use(express.json());

app.get('/reviews', async (req, res) => {
  // localhost:8000/reviews?product_id=5
  const {product_id, sort, count} = req.query;
  let xd = await db.getReviews(product_id, sort, count)
  res.send(JSON.stringify(xd))
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})