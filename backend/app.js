const express = require('express');
const app = express();
const router = require('./src/routes/blog');
const db = require('./src/db/db');
const middleware = require('./src/middleware/middleware');

//?MIDDLEWARE
middleware(app);

//?ROUTER
app.use('/api/v1', router);

//?CONNECTION TO DB
db.connect()
  .then((res) => {
    app.listen(4000, () => {
      console.log('Server listenig on port http://localhost:4000');
    });
  })
  .catch((err) => console.log(err));
