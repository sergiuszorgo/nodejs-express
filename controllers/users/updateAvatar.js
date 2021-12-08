const fs = require('fs/promises')
const path = require('path')
const moment = require('moment')

const { User } = require('../../model/userSchema')
const avatarsDir = path.join(__dirname, '../../public/avatars')

const updateAvatar = async (req, res) => {
  const { _id } = req.user
  const { path: tempDir, originalname } = req.file
  const data = moment().format('DD-MM-YY_hh-mm-ss')
  const filename = `${data}_${originalname}`
  const resultUpload = path.join(avatarsDir, filename)
  try {
    await fs.rename(tempDir, resultUpload)
    const avatar = path.join('/avatars', filename)
    const result = await User.findByIdAndUpdate(_id, { avatarURL: avatar }, { new: true })
    if (!result) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `User with id=${_id} not found`,
      })
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    await fs.unlink(tempDir)
    throw error
  }
}

module.exports = updateAvatar
