const imageController = require('../controllers/imagesController')
const express = require('express');
const router = express.Router();

router.get('/images/pipeImage/:key', imageController.getPipedImage)

module.exports = router