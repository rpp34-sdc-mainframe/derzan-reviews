
const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  socketPath : '/tmp/mysql.sock',
  host     : 'localhost',
  user     : 'root',
  password : '123',
  database : 'ratingsAndReviews',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
// pool.query(`select * from reviews where reviews.product_id = ${5}`).then(
//   (x, y, z) => {
//     console.log(x)
//     console.log(y)
//     console.log(z);
//   }
// )
module.exports = pool;