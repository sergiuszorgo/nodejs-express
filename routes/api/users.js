const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/users')

router.post('/register', ctrl.register)

module.exports = router
