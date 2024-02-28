// src/controllers/userController.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

const updateUserProfile = async (req, res) => {
  const { userId } = req.params
  const { username, email, roleId } = req.body

  try {
    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { userId: parseInt(userId) }
    })

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { userId: parseInt(userId) },
      data: { username, email, roleId }
    })

    res.json(updatedUser)
  } catch (error) {
    console.error('Update User Profile Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const changePassword = async (req, res) => {
  const { userId } = req.params
  const { oldPassword, newPassword } = req.body

  try {
    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { userId: parseInt(userId) }
    })

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Check if the old password is correct
    if (!bcrypt.compareSync(oldPassword, existingUser.password)) {
      return res.status(401).json({ message: 'Incorrect old password' })
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    // Update the password
    await prisma.user.update({
      where: { userId: parseInt(userId) },
      data: { password: hashedNewPassword }
    })

    res.json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error('Change Password Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    console.error('Get All Users Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getUserById = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { userId: parseInt(userId) }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error('Get User by ID Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const deleteUserById = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { userId: parseInt(userId) }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await prisma.user.delete({
      where: { userId: parseInt(userId) }
    })

    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Delete User by ID Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  updateUserProfile,
  changePassword,
  getAllUsers,
  getUserById,
  deleteUserById
}
