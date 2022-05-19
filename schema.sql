SET profiling = 1;
DROP DATABASE IF EXISTS ratingsAndReviews;
CREATE DATABASE ratingsAndReviews;

USE ratingsAndReviews;

CREATE TABLE product (
  id INT unsigned PRIMARY KEY,
  name VARCHAR(1000),
  slogan TEXT,
  description TEXT,
  category VARCHAR(1000),
  default_price INT unsigned
);

CREATE TABLE reviews (
  id INT unsigned PRIMARY KEY,
  product_id INT unsigned,
  rating TINYINT,
  date INT unsigned,
  summary VARCHAR(60),
  body VARCHAR(1000),
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(60),
  reviewer VARCHAR(60),
  response TEXT,
  helpfulness TINYINT,

  FOREIGN KEY (product_id)
    REFERENCES product(id)
);

CREATE TABLE reviews_photos (
  id INT unsigned PRIMARY KEY,
  review_id INT unsigned,
  url VARCHAR(2083),

  FOREIGN KEY (review_id)
    REFERENCES reviews(id)
);

CREATE TABLE characteristics (
  id INT unsigned PRIMARY KEY,
  product_id INT unsigned,
  name VARCHAR(100),

  FOREIGN KEY (product_id)
    REFERENCES product(id)
);

CREATE TABLE characteristic_reviews (
  id INT unsigned PRIMARY KEY,
  characteristic_id INT unsigned,
  review_id INT unsigned,

  FOREIGN KEY (characteristic_id)
    REFERENCES characteristics(id),

  FOREIGN KEY (review_id)
    REFERENCES reviews(id)
);

LOAD DATA LOCAL INFILE '/Users/derzanchiang/Desktop/sdcdata/product.csv'
INTO TABLE product
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/derzanchiang/Desktop/sdcdata/reviews.csv'
INTO TABLE reviews
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/derzanchiang/Desktop/sdcdata/reviews_photos.csv'
INTO TABLE reviews_photos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/derzanchiang/Desktop/sdcdata/characteristics.csv'
INTO TABLE characteristics
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/derzanchiang/Desktop/sdcdata/characteristic_reviews.csv'
INTO TABLE characteristic_reviews
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SHOW PROFILES;