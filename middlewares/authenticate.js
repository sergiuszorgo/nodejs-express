const jwt = require('jsonwebtoken')

const { SECRET_KEY } = process.env
const { User } = require('../model/userSchema')

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY)
      const user = await User.findById(id)
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        })
      }
      req.user = user
      next()
    } catch (error) {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
