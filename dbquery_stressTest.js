const db = require('./mysqlConnection.js');

/**
 * Query for all reviews of a product and all the photos for each review
 * @param {number} product_id the product id
 * @returns {number} execution time of all the queries
 */
async function queryReviewsByProductId(product_id) {
  let timeBefore = Date.now();
  const [reviews, rFields] = await db.query(`select * from reviews where reviews.product_id = ${product_id}`);

  for (let review of reviews) {
    const [photos, pFields] = await db.query(`select * from reviews_photos where reviews_photos.review_id = ${review.id}`);
  }
  return Date.now() - timeBefore;
}

/**
 * Query through all 1,000,011 products for reviews and reviews_photos
 * @returns {number} avgerage execution time of all 1,000,011 queries in miliseconds
 */
async function allProductReviewsQueryStressTest() {

  const allExecutionTImes = [];
  for (let i = 1; i <= 1000011; i++) {
    const executionTime = await queryReviewsByProductId(i)
    allExecutionTImes.push(executionTime)
  }
  return allExecutionTImes.reduce((partialSum, a) => partialSum + a, 0) / allExecutionTImes.length;
}
allProductReviewsQueryStressTest();