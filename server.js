const connection = require('./mysqlConnection.js');
async function queryStressTest() {

  const allExecutionTImes = [];

  async function getReviews(product_id) {
    let obj = {
      product: product_id,
      results : []
    }
    let timeBefore = Date.now();
    const [reviews, rFields] = await connection.query(`select * from reviews where reviews.product_id = ${product_id}`);
    obj.count = reviews.length

    for (let review of reviews) {

      const [photos, pFields] = await connection.query(`select * from reviews_photos where reviews_photos.review_id = ${review.id}`);
      review.review_id = review.id;
      delete review.id;
      delete review.product_id;
      review.recommend = Boolean(review.recommend);
      delete review.reported;
      review.date = new Date(review.date).toISOString();
      review.photos = photos;
      obj.results.push(review);
    }
    allExecutionTImes.push(Date.now() - timeBefore);
  }
  let xd = await getReviews(1)
  for (let i = 1; i <= 1000011; i++) {
    let xd = await getReviews(i)
  }
  console.log(allExecutionTImes);
  console.log('AVERAGE: ', allExecutionTImes.reduce((partialSum, a) => partialSum + a, 0) / allExecutionTImes.length);
}


// connection.end();
