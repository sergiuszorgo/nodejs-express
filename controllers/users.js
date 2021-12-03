const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs/promises')
const path = require('path')
const moment = require('moment')
const { nanoid } = require('nanoid')
const nodemailer = require('nodemailer')

const nodemailerConfig = require('../helpers/sendmailconfig')
const { User } = require('../model/userSchema')
const { SECRET_KEY } = process.env

const avatarsDir = path.join(__dirname, '../public/avatars')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: `User with email=${email} already exist`,
    })
  }
  const verificationToken = nanoid()
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  await User.create({ email, password: hashPassword, verificationToken })
  const mail = {
    to: email,
    subject: 'Подтверждение регистрации',
    html: `<h3>Перейдите по <a href="http://localhost:3000/api/users/verify/${verificationToken}">ссылке</a> для подтверждения email</h3>`,
  }
  const transporter = nodemailer.createTransport(nodemailerConfig)
  transporter
    .sendMail(mail)
    .then(() => console.log('Email отправлен'))
    .catch(err => console.log(err.message))

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  const compareResult = bcrypt.compareSync(password, user.password)
  if (!user || !user.verify || !compareResult) {
    return res.status(401).json({
      status: 'Unauthorized',
      code: 401,
      message: 'Wrong email or password',
    })
  }
  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  })
}

const updateAvatar = async (req, res) => {
  const { _id } = req.user
  const { path: tempDir, originalname } = req.file
  const data = moment().format('DD-MM-YY_hh-mm-ss')
  const filename = `${data}_${originalname}`
  const resultUpload = path.join(avatarsDir, filename)
  try {
    await fs.rename(tempDir, resultUpload)
    const avatar = path.join('/avatars', filename)
    const result = await User.findByIdAndUpdate(_id, { avatarURL: avatar }, { new: true })
    if (!result) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `User with id=${_id} not found`,
      })
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    await fs.unlink(tempDir)
    throw error
  }
}

const logout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  res.status(204).json()
}

const verify = async (req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })
  if (!user) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'User not found',
    })
  }
  await User.findByIdAndUpdate(user._id, { verificationToken: null, verify: true })
  res.json({
    message: 'Verify success',
  })
}

module.exports = {
  register,
  login,
  logout,
  updateAvatar,
  verify,
}
