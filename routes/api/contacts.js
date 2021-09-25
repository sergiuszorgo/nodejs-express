const express = require('express')
const router = express.Router()
const Contacts = require('../../model/index')

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
    const { id } = req.params
    const result = await Contacts.getContactById(id)
    if (!result) {
      return res.json({ status: 'error', code: 400, message: `Not found id = ${id}` })
    }
    return res.json({ status: 'succes', code: 200, data: { result } })
  } catch (err) {
    next(err)
  }
})

// router.get('/:contactId', async (req, res, next) => {
//   try {
//     const result = await Contacts.getContactById(req.params.contactId)
//     if (result) {
//       return res.json({ status: 'succes', code: 200, data: { result } })
//     }
//     return res.json({ status: 'error', code: 404, message: 'Not found' })
//   } catch (err) {
//     next(err)
//   }
// })

router.post('/', async (req, res, next) => {
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
      return res.json({ status: 'succes', code: 200, data: { result } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found for delete' })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const result = await Contacts.updateContact()
    if (result) {
      return res.json({ status: 'succes', code: 200, data: { result } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
