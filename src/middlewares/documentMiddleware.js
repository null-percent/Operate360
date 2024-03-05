// src/middlewares/documentMiddleware.js
const multer = require('multer')

// Set up multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
})

module.exports = {
  upload
}
