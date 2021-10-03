const express = require('express')
const router = express.Router()
const Contacts = require('../../model/')
const { validationCreateContact, validationUpdateContact } = require('../../validation/contacts')

router.get('/', async (req, res, next) => {
  try {
    const result = await Contacts.listContacts()
    return res.json({ status: 'succes', code: 200, data: { result } })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await Contacts.getContactById(req.params.contactId)
    if (result) {
      return res.json({ status: 'succes', code: 200, data: { result } })
    }
    return res.json({
      status: 'error',
      code: 404,
      message: `Contact with id = ${req.params.contactId} not found`,
    })
  } catch (err) {
    next(err)
  }
})

router.post('/', validationCreateContact, async (req, res, next) => {
  try {
    const result = await Contacts.addContact(req.body)
    return res.json({ status: 'succes', code: 201, data: { result } })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await Contacts.removeContact(req.params.contactId)
    if (result) {
      return res.json({ status: 'succes', code: 200, message: 'Contact deleted!' })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found for delete!' })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', validationUpdateContact, async (req, res, next) => {
  try {
    const result = await Contacts.updateContact(req.params.contactId, req.body)
    if (result) {
      return res.json({ status: 'succes', code: 200, data: { result } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
