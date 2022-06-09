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
  const orderColumn = sort === 'newest' ? 'date' : 'helpfulness';
  const [reviews, rFields] = await connection.query(`SELECT * FROM reviews WHERE reviews.product_id = ${product_id} ORDER BY ${orderColumn} DESC LIMIT ${count}`);
  obj.count = reviews.length

  for (let review of reviews) {

    const [photos, pFields] = await connection.query(`select * from reviews_photos where reviews_photos.review_id = ${review.id}`);
    review.review_id = review.id;
    delete review.id;
    delete review.product_id;
    review.recommend = Boolean(review.recommend);
    delete review.reported;
    // console.log(review.date, review.helpfulness,new Date(review.date).toISOString())
    review.date = new Date(review.date).toISOString();
    review.photos = photos;
    obj.results.push(review);
  }
  return obj;
}

async function getMetadata(product_id) {
  let metaData = {};
  metaData["product_id"] = String(product_id);

  const [reviews, rFields] = await connection.query(`SELECT * FROM reviews WHERE reviews.product_id = ${product_id}`);
  let ratings = {};
  let recommended = {};
  for (const review of reviews) {
    if (review.rating in ratings) {
      ratings[review.rating] ++;
    } else {
      ratings[review.rating] = 1;
    }
    if (review.recommend in recommended) {
      recommended[review.recommend] ++;
    } else {
      recommended[review.recommend] = 1;
    }
  }
  metaData.ratings = ratings;
  metaData.recommended = recommended;

  let [characteristics, cFields] = await connection.query(`SELECT name, value, characteristic_id  from characteristics inner join characteristic_reviews on characteristic_reviews.characteristic_id = characteristics.id where product_id = ${product_id}`);
  let tempCharacteristics = {};
  for (const characteristic of characteristics) {
    if (characteristic.name in tempCharacteristics) {
      tempCharacteristics[characteristic.name].value.push(characteristic.value)
    } else {
      tempCharacteristics[characteristic.name] = {
        id : characteristic.characteristic_id,
        value : [characteristic.value]
      };
    }
  }

  for (const [key, value] of Object.entries(tempCharacteristics)) {
    let avgValue = value.value.reduce((a, b) => a + b) / value.value.length;
    value.value = avgValue.toFixed(4);
  }
  metaData.characteristics = tempCharacteristics;
  return metaData;
}

// let xd = async () => {
//   let xd = await getReviews(5);
//   console.log(xd)
// }
// xd();
module.exports = {getReviews, getMetadata}