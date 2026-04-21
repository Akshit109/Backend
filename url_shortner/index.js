const express = require('express');
const connectionDb = require('./config/db');
const {router} = require('./routes/urlRoute');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectionDb('mongodb://127.0.0.1:27017/URL_SHORTNER')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });


app.use('/api',router);


app.listen(3000, () => {
  console.log("Server running on port 3000");
});