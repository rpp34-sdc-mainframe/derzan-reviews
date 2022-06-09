const app = require('./server');
const supertest = require('supertest');
const request = supertest(app);

it('Check metaData route returns 200', async () => {
  const res = await request.get('/reviews/meta?product_id=5');
  expect(res.status).toBe(200);
});

it('Check metaData route return object has correct keys', async () => {
  const res = await request.get('/reviews/meta?product_id=5');
  const returnObject = JSON.parse(res.text);
  expect('product_id' in returnObject).toBe(true);
  expect('ratings' in returnObject).toBe(true);
  expect('recommended' in returnObject).toBe(true);
  expect('characteristics' in returnObject).toBe(true);
});

it('Check review route returns 200', async () => {
  const res = await request.get('/reviews?product_id=60&sort=relevant');
  expect(res.status).toBe(200);
})

it('Check review return object has correct keys', async () => {
  const res = await request.get('/reviews?product_id=60&sort=relevant');
  const returnObject = JSON.parse(res.text);
  expect('product' in returnObject).toBe(true);
  expect('results' in returnObject).toBe(true);
});