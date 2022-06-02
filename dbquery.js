const connection = require('./mysqlConnection.js');

/**
 * Query for all reviews of a product and all the photos for each review and put them into an object
 * @param {number} product_id the product id
 * @returns {object} Returns an object of reviews for a particular product.
 */
async function getReviews(product_id) {
  let obj = {
    product: product_id,
    results : []
  }

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
  return obj
}
let x = async () => {console.log(await getReviews(5))}
x();

