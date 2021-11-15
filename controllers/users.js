const bcrypt = require('bcryptjs')
const { User } = require('../model/userSchema')
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
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const newUser = await User.create({ email, password: hashPassword })
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `User with email=${email} not found`,
    })
  }
  const compareResult = bcrypt.compareSync(password, user.password)
  if (!compareResult) {
    return res.status(401).json({
      status: 'Unauthorized',
      code: 401,
      message: 'Wrong email or password',
    })
  }
  const token = 'skjghrgjoit.wertgryrthy.grtgrtfhy'
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  })
}

module.exports = {
  register,
  login,
}
