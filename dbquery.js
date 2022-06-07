const connection = require('./mysqlConnection.js');

/**
 * Query for all reviews of a product and all the photos for each review and put them into an object
 *
 * @async
 * @function getReviews
 * @param {number} product_id the product id
 * @returns {object} Returns an object of reviews for a particular product.
 */
async function getReviews(product_id, sort, count=5) {
  let obj = {
    product: product_id,
    results : []
  }

  const [reviews, rFields] = await connection.query(`SELECT * FROM reviews WHERE reviews.product_id = ${product_id} LIMIT 10`);
  obj.count = reviews.length

  for (let review of reviews) {

    const [photos, pFields] = await connection.query(`select * from reviews_photos where reviews_photos.review_id = ${review.id}`);
    review.review_id = review.id;
    delete review.id;
    delete review.product_id;
    review.recommend = Boolean(review.recommend);
    delete review.reported;
    console.log(review.date, new Date(review.date).toISOString())
    review.date = new Date(review.date).toISOString();
    review.photos = photos;
    obj.results.push(review);
  }
  return obj;
}
// let xd = async () => {
//   let xd = await getReviews(5);
//   console.log(xd)
// }
// xd();
module.exports = {getReviews}