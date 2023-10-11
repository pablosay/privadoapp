const express = require('express');

const router = express.Router();

const rpiController = require('../controllers/rpiConfigurationController');

const authorizedPersonsController = require('../controllers/authorizedPersonsController')


router.put('/rpiconfig/updateWhatsAppNumber', rpiController.updateWhatsAppNumber)

router.put('/rpiconfig/updateProcessingServerIP', rpiController.updateProcessingServerIP)

router.put('/rpiconfig/updateVigilanceTime', rpiController.updateVigilanceTime)

router.post('/authorizedPersons/register', authorizedPersonsController.registerNewAuthorizedPerson)

module.exports = router
