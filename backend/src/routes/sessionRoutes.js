const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController')

router.post('/session/logIn', sessionController.login)
router.post('/session/refreshToken', sessionController.refreshToken)
router.get('/session/verify', sessionController.verify)
router.post('/session/logOut', sessionController.logOut)

module.exports = router
