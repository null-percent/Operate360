// src/middleware/userMiddleware.js
const validateUpdateUserProfile = (req, res, next) => {
  const { username, email, roleId } = req.body

  if (!username || !email || !roleId) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  next()
}

const validateChangePassword = (req, res, next) => {
  const { oldPassword, newPassword } = req.body

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: 'Old password and new password are required' })
  }

  next()
}

module.exports = { validateUpdateUserProfile, validateChangePassword }
