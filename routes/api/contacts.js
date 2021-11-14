const express = require('express')
const router = express.Router()
const controller = require('../../controllers/contacts')
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require('../../validation/contacts')

router.get('/', controller.listContacts)

router.get('/:contactId', controller.getContactById)

router.post('/', validationCreateContact, controller.addContact)

router.put('/:contactId', validationUpdateStatusContact, controller.updateContact)

router.patch('/:contactId', validationUpdateContact, controller.updateContact)

router.delete('/:contactId', controller.removeContact)

module.exports = router
