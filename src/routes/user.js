// src/routes/userRoutes.js
const express = require('express')
const {
  updateUserProfile,
  changePassword,
  getAllUsers,
  getUserById,
  deleteUserById
} = require('../controllers/userController')
const {
  validateUpdateUserProfile,
  validateChangePassword
} = require('../middlewares/userMiddleware')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /api/user/{userId}/update-profile:
 *   put:
 *     summary: Update user profile by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
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
 *               roleId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             example:
 *               userId: 1
 *               username: updatedUsername
 *               email: updated@email.com
 *               roleId: 2
 *               createdAt: "2022-01-01T00:00:00.000Z"
 *               updatedAt: "2022-01-02T12:34:56.789Z"
 *       400:
 *         description: All fields are required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  '/:userId/update-profile',
  validateUpdateUserProfile,
  updateUserProfile
)

/**
 * @swagger
 * /api/user/{userId}/change-password:
 *   put:
 *     summary: Change user password by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Password updated successfully"
 *       400:
 *         description: Old password and new password are required
 *       401:
 *         description: Incorrect old password
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:userId/change-password', validateChangePassword, changePassword)

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             example:
 *               - userId: 1
 *                 username: user1
 *                 email: user1@example.com
 *                 roleId: 1
 *                 createdAt: "2022-01-01T00:00:00.000Z"
 *                 updatedAt: "2022-01-02T12:34:56.789Z"
 *               - userId: 2
 *                 username: user2
 *                 email: user2@example.com
 *                 roleId: 2
 *                 createdAt: "2022-01-02T00:00:00.000Z"
 *                 updatedAt: "2022-01-02T12:34:56.789Z"
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getAllUsers)

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             example:
 *               userId: 1
 *               username: user1
 *               email: user1@example.com
 *               roleId: 1
 *               createdAt: "2022-01-01T00:00:00.000Z"
 *               updatedAt: "2022-01-02T12:34:56.789Z"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:userId', getUserById)

/**
 * @swagger
 * /api/user/{userId}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User deleted successfully"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:userId', deleteUserById)

module.exports = router
