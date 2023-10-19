const imageController = require('../controllers/imagesController')
const express = require('express');
const router = express.Router();

router.get('/images/pipeImage/:id', imageController.getPipedImage)

module.exports = router