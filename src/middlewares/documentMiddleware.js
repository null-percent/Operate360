// src/middlewares/documentMiddleware.js
const { body } = require('express-validator')

const documentValidation = [
  body('employeeId').isInt().withMessage('Employee ID must be an integer'),
  body('title').notEmpty().withMessage('Title cannot be empty'),
  body('description').notEmpty().withMessage('Description cannot be empty')
]

module.exports = {
  documentValidation
}
