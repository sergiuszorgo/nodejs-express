const app = require('../app')
const dbase = require('../dbase/index')

const PORT = process.env.PORT || 3000

dbase
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(error => {
    console.log(`Server not running! Error: ${error.message}`)
    process.exit(1)
  })
