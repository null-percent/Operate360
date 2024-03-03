// src/routes/documentRoutes.js
const express = require('express')
const { uploadDocument, upload } = require('../controllers/documentController')
const { documentValidation } = require('../middlewares/documentMiddleware')

const router = express.Router()

/**
 * @swagger
 * /api/documents/upload:
 *   post:
 *     summary: Upload a document
 *     tags: [Documents]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: employeeId
 *         type: integer
 *         required: true
 *         description: Employee ID associated with the document
 *       - in: formData
 *         name: title
 *         type: string
 *         required: true
 *         description: Title of the document
 *       - in: formData
 *         name: description
 *         type: string
 *         required: true
 *         description: Description of the document
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: The document file to upload
 *     responses:
 *       200:
 *         description: Document uploaded successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Document uploaded successfully"
 *               document: {
 *                 documentId: 1,
 *                 title: 'Document Title',
 *                 description: 'Document Description',
 *                 fileUrl: '/uploads/documents/1234567890-document.pdf',
 *                 createdAt: "2022-01-01T00:00:00.000Z",
 *                 updatedAt: "2022-01-01T12:34:56.789Z",
 *                 employeeId: 1
 *               }
 *       400:
 *         description: No document uploaded or validation error
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal Server Error
 */
router.post(
  '/upload',
  documentValidation,
  upload.single('file'),
  uploadDocument
)

module.exports = router
