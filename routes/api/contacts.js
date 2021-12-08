const express = require('express')
const router = express.Router()
const controller = require('../../controllers/contacts/contacts')
const { authenticate } = require('../../middlewares')
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require('../../validation/contacts')

router.get('/', authenticate, controller.listContacts)

router.get('/:contactId', authenticate, controller.getContactById)

router.post('/', authenticate, validationCreateContact, controller.addContact)

router.put('/:contactId', authenticate, validationUpdateStatusContact, controller.updateContact)

router.patch('/:contactId', authenticate, validationUpdateContact, controller.updateContact)

router.delete('/:contactId', controller.removeContact)

module.exports = router
