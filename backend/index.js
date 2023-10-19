const express = require('express');
const dotenv = require('dotenv').config()
const app = express();
const cors = require('cors');

const rpiRoutes = require('./src/routes/rpiConfigRoutes')
const authorizedPersonsRoutes = require('./src/routes/authorizedPersonsRoutes')
const sessionRoutes = require('./src/routes/sessionRoutes')
const embeddingRoutes = require('./src/routes/embeddingsRoutes')
const logsRoutes = require('./src/routes/logsRoutes')
const imageRoutes = require('./src/routes/imagesRoutes')

app.use(express.json({ limit: '1gb' }));
app.use(cors())
app.use(rpiRoutes)
app.use(authorizedPersonsRoutes)
app.use(sessionRoutes)
app.use(embeddingRoutes)
app.use(imageRoutes)
app.use(logsRoutes)

const port = process.env.PORT || 3000;

app.listen(port, () => {

  console.log(`Server is running on port ${port}`);
  
});