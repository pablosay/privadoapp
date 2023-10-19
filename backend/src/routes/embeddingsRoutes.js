const express = require('express');
const router = express.Router();
const embeddingsController = require('../controllers/embeddingsController')

router.put('/embeddings/update', embeddingsController.updateEmbeddingsForProcessingServer)
router.get('/embeddings/get', embeddingsController.getAllEmbeddings)

module.exports = router

