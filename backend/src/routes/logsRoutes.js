const logsController = require('../controllers/logsController')
const express = require('express');
const router = express.Router();

router.post('/log/entry', logsController.registerNewEntry)
router.post('/log/intruder', logsController.registerNewSpoof)
router.get('/log/entries', logsController.getEntries)
router.get('/log/intruders', logsController.getIntrudersLog)

module.exports = router