const logsController = require('../controllers/logsController')
const express = require('express');
const router = express.Router();

router.post('/log/entry', logsController.registerNewEntry)
router.post('/log/intruder', logsController.registerNewSpoof)

module.exports = router