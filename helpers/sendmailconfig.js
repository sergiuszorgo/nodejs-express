require('dotenv').config()

const { GMAIL_PASSWORD, GMAIL } = process.env

const nodemailerConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: GMAIL,
    pass: GMAIL_PASSWORD,
  },
}

module.exports = nodemailerConfig
