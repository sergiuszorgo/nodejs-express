const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/users')
const { validation, ctrlWrapper, authenticate, upload } = require('../../middlewares')
const { joiSchema } = require('../../model/userSchema')

router.post('/register', validation(joiSchema), ctrlWrapper(ctrl.register))
router.post('/login', validation(joiSchema), ctrlWrapper(ctrl.login))
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout))
router.patch('/avatars', authenticate, upload.single('avatarURL'), ctrlWrapper(ctrl.updateAvatar))
module.exports = router
