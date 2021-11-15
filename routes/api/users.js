const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/users')
const { validation, ctrlWrapper } = require('../../middlewares')
const { joiSchema } = require('../../model/userSchema')

router.post('/register', validation(joiSchema), ctrlWrapper(ctrl.register))
router.post('/login', validation(joiSchema), ctrlWrapper(ctrl.login))
module.exports = router
