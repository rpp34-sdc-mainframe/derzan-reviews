const app = require('./server.js');
const port = 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});