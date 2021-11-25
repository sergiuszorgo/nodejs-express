const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs/promises')
const path = require('path')
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
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  await User.create({ email, password: hashPassword })
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
  const resultUpload = path.join(avatarsDir, originalname)
  try {
    await fs.rename(tempDir, resultUpload)
    const avatar = path.join('/avatars', originalname)
    const result = await User.findByIdAndUpdate(_id, { avatar }, { new: true })
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

module.exports = {
  register,
  login,
  logout,
  updateAvatar,
}
