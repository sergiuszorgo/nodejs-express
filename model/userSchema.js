const { Schema, model } = require('mongoose')
const Joi = require('joi')

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const re = /.+@.+\..+/i
        return re.test(String(value).toLowerCase())
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

const joiSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().alphanum().min(6).max(25).required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema,
}
