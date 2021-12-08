const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../../model/userSchema')
const { SECRET_KEY } = process.env

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

module.exports = login
