// src/routes/documentRoutes.js
const express = require('express')
const { uploadDocument } = require('../controllers/documentController')
const { upload } = require('../middlewares/documentMiddleware')

const router = express.Router()

// ... (previous routes)

/**
 * @swagger
 * /api/documents/create:
 *   post:
 *     summary: Upload a document
 *     tags: [Documents]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Document uploaded successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Document uploaded successfully"
 *               document: {
 *                 documentId: 1,
 *                 employeeId: 1,
 *                 title: 'Document Title',
 *                 description: 'Document Description',
 *                 fileUrl: '/uploads/1646888958395_document.pdf',
 *                 createdAt: "2022-01-01T00:00:00.000Z",
 *                 updatedAt: "2022-01-01T12:34:56.789Z"
 *               }
 *       400:
 *         description: File size exceeds the limit of 5MB
 *       500:
 *         description: Internal Server Error
 */
router.post('/create', upload.single('file'), uploadDocument)

module.exports = router
