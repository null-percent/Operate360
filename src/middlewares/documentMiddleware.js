// src/middlewares/documentMiddleware.js
const multer = require('multer')
const { param, validationResult } = require('express-validator')

// Set up multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
})

const validateDocumentId = [
  param('documentId').isInt({ min: 1 }).withMessage('Invalid document ID'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

module.exports = {
  upload,
  validateDocumentId
}
