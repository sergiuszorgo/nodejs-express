const Joi = require('joi')

const joiSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().alphanum().min(6).max(25).required(),
})
// файл уже не нужен
