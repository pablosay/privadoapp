const express = require('express');
const router = express.Router();
const rpiController = require('../controllers/rpiConfigurationController');


router.put('/rpiconfig/updateWhatsAppNumber', rpiController.updateWhatsAppNumber)
router.put('/rpiconfig/updateProcessingServerIP', rpiController.updateProcessingServerIP)
router.put('/rpiconfig/updateVigilanceTime', rpiController.updateVigilanceTime)
router.get('/rpiconfig/whatsAppNumber', rpiController.getWhatsAppNumber)
router.get('/rpiconfig/currentIp', rpiController.getIp)
router.get('/rpiconfig/vigilanceTime', rpiController.getVigilanceTime)
router.put('/rpiconfig/status/activate', rpiController.activateDevice)
router.get('/rpiconfig/status', rpiController.getStatus)

module.exports = router
