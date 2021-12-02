const validation = require('./validation')
const ctrlWrapper = require('./ctrlWrapper')
const authenticate = require('./authenticate')
const upload = require('./uploadLocal')

module.exports = {
  validation,
  ctrlWrapper,
  authenticate,
  upload,
}
