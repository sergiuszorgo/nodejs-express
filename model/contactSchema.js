const { Schema, model } = require('mongoose')

const contactSchema = new Schema({
  name: {
    type: String,
    require: [true, 'Set name'],
    minlength: 2,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
})

const Contact = model('contact', contactSchema)

module.exports = Contact
