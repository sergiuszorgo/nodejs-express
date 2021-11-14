const { Schema, model } = require('mongoose')
const Joi = require('joi')

const userSchema = Schema(
  {
    email: {},
    password,
  },
  { versionKey: false, timestamps: true },
)

const User = model('user', userSchema)

module.exports = User
