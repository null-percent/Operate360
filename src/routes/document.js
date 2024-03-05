// src/routes/documentRoutes.js
const express = require('express')
const {
  uploadDocument,
  deleteDocument,
  getDocumentsByEmployee,
  getAllDocuments
} = require('../controllers/documentController')
const {
  upload,
  validateDocumentId
} = require('../middlewares/documentMiddleware')

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

/**
 * @swagger
 * /api/documents/{documentId}/delete:
 *   delete:
 *     summary: Delete a document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: documentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the document to delete
 *     responses:
 *       200:
 *         description: Document deleted successfully
 *       400:
 *         description: Invalid document ID
 *       404:
 *         description: Document not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:documentId/delete', validateDocumentId, deleteDocument)

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Document management
 */

/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Get all documents
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: List of documents
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getAllDocuments)

/**
 * @swagger
 * /api/documents/employee/{employeeId}:
 *   get:
 *     summary: Get all documents related to a specific employee by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the employee
 *     responses:
 *       200:
 *         description: List of documents related to the employee
 *       400:
 *         description: Invalid employee ID
 *       500:
 *         description: Internal Server Error
 */
router.get('/employee/:employeeId', getDocumentsByEmployee)

module.exports = router
