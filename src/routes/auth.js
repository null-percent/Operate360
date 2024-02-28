// src/auth/authRoutes.js
const express = require('express')
const { login, logout, register } = require('../controllers/authController')
const { authenticateToken } = require('../middlewares/authMiddleware')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication Process management
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               token: "jwt-token"
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', login)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             example:
 *               message: "Logout successful"
 *       401:
 *         description: Unauthorized
 */
router.post('/logout', authenticateToken, logout)

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: User registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roleId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             example:
 *               token: "jwt-token"
 *       400:
 *         description: Email is already registered
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', register)

module.exports = router
