const mongoose = require('mongoose')
require('dotenv').config()
const dbHost = process.env.DB_HOST

const dbase = mongoose.connect(dbHost, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
})

mongoose.connection.on('connected', () => {
  console.log('Database connection successful')
})

mongoose.connection.on('error', err => {
  console.log(`Error connection ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected')
})

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Connection to DB disconnected')
    process.exit(1)
  })
})

module.exports = dbase
