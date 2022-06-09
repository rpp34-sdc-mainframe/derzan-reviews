var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123',
  database : 'ratingsAndReviews',
  socketPath : '/tmp/mysql.sock',
});

connection.connect(function(err){
  if(!err) {
      console.log("Database is connected ... nn");
  } else {
      console.log(err);
  };
})

connection.query('select * from reviews where reviews.product_id = 6', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', fields);
});

connection.end();