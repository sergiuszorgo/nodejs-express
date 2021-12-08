const bcrypt = require('bcryptjs')
const { nanoid } = require('nanoid')
const nodemailer = require('nodemailer')

const nodemailerConfig = require('../../helpers/sendmailconfig')
const { User } = require('../../model/userSchema')

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
    html: `<p>Перейдите по <a href="http://localhost:3000/api/users/verify/${verificationToken}">ссылке</a> для подтверждения email</p>`,
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

module.exports = register
