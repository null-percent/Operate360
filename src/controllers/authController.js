// src/auth/authController.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

// Maintain a list of revoked tokens
const revokedTokens = new Set()

const generateToken = (userId, username, roleId) => {
  const secretKey = 'operate360-secret' // Replace with your secret key
  return jwt.sign({ userId, username, roleId }, secretKey, { expiresIn: '1h' })
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true }
    })

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = generateToken(user.userId, user.username, user.roleId)

    res.json({ message: 'login successfully', token })
  } catch (error) {
    console.error('Login Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const logout = async (req, res) => {
  try {
    // Extract token from the authorization header
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // Add the token to the revoked tokens list
    revokedTokens.add(token)

    res.json({ message: 'Logout successful' })
  } catch (error) {
    console.error('Logout Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const register = async (req, res) => {
  const { username, email, password, roleId } = req.body

  try {
    if (!username || !email || !password || !roleId) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        roleId
      },
      include: { role: true }
    })

    const token = generateToken(
      newUser.userId,
      newUser.username,
      newUser.roleId
    )

    res.status(201).json({ message: 'Register a user successfully', token })
  } catch (error) {
    console.error('Registration Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = { login, logout, register }
