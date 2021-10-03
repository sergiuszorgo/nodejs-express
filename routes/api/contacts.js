const express = require('express')
const router = express.Router()
const controller = require('../../controllers/index')
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require('../../validation/contacts')

router.get('/', controller.listContacts)

router.get('/:contactId', controller.getContactById)

router.post('/', validationCreateContact, controller.addContact)

router.put('/:contactId', validationUpdateContact, controller.updateContact)

router.patch('/:contactId', controller.updateContact)

router.delete('/:contactId', validationUpdateStatusContact, controller.removeContact)

module.exports = router
