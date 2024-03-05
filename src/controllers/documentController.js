// src/controllers/documentController.js
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

const uploadDocument = async (req, res) => {
  try {
    const { employeeId, title, description } = req.body
    const { file } = req

    // Check if file size is not bigger than 5MB
    if (file.size > 5 * 1024 * 1024) {
      return res
        .status(400)
        .json({ message: 'File size exceeds the limit of 5MB' })
    }

    // Generate a unique filename
    const uniqueFilename = `${Date.now()}_${file.originalname}`

    // Create a path to store the file in the public/uploads directory
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'public',
      'uploads',
      uniqueFilename
    )

    // Write the file to the server
    fs.writeFileSync(filePath, file.buffer)

    // Store file data in the database
    const document = await prisma.document.create({
      data: {
        employeeId: parseInt(employeeId),
        title,
        description,
        fileUrl: `/uploads/${uniqueFilename}`
      }
    })

    res.json({ message: 'Document uploaded successfully', document })
  } catch (error) {
    console.error('Upload Document Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 * Delete a document by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteDocument = async (req, res) => {
  try {
    const { documentId } = req.params

    // Retrieve document data from the database
    const document = await prisma.document.findUnique({
      where: {
        documentId: parseInt(documentId)
      }
    })

    // Check if the document exists
    if (!document) {
      return res.status(404).json({ message: 'Document not found' })
    }

    // Delete the file from the server
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'public',
      document.fileUrl
    )
    fs.unlinkSync(filePath)

    // Delete the document from the database
    await prisma.document.delete({
      where: {
        documentId: parseInt(documentId)
      }
    })

    res.json({ message: 'Document deleted successfully' })
  } catch (error) {
    console.error('Delete Document Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 * Get all documents
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllDocuments = async (req, res) => {
  try {
    // Retrieve all documents from the database
    const documents = await prisma.document.findMany()

    res.json(documents)
  } catch (error) {
    console.error('Get All Documents Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 * Get all documents related to a specific employee by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getDocumentsByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params

    // Retrieve documents related to the employee from the database
    const documents = await prisma.document.findMany({
      where: {
        employeeId: parseInt(employeeId)
      }
    })

    res.json(documents)
  } catch (error) {
    console.error('Get Documents By Employee Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  // ... (previous exports)
  uploadDocument,
  deleteDocument,
  getAllDocuments,
  getDocumentsByEmployee
}
