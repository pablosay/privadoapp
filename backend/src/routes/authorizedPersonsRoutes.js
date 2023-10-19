const express = require('express');
const router = express.Router();
const authorizedPersonsController = require('../controllers/authorizedPersonsController')

router.post('/authorizedPersons/register', authorizedPersonsController.registerNewAuthorizedPerson)
router.get('/authorizedPersons/get', authorizedPersonsController.getAuthorizedPersons)
router.delete('/authorizedPersons/deleteAuthorizedPerson', authorizedPersonsController.deleteAuthorizedPerson)
router.get('/authorizedPersons/getImages/:id', authorizedPersonsController.getImagesFromAuthorizedPerson)
router.delete('/authorizedPersons/deleteImage/id/:id/key/:key', authorizedPersonsController.deteleImageFromAuthorizedPerson)
router.post('/authorizedPersons/uploadSingleImage', authorizedPersonsController.uploadSingleImageFromAuthorizedPerson)

module.exports = router