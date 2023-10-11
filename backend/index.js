const express = require('express');

const dotenv = require('dotenv').config()

const app = express();

const cors = require('cors');

const rpiRoutes = require('./src/routes/rpiConfigRoutes')

app.use(express.json());

app.use(cors())

app.use(rpiRoutes)

const port = process.env.PORT || 3000;

app.listen(port, () => {

  console.log(`Server is running on port ${port}`);
  
});