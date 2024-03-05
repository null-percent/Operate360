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

    // Create a path to store the file
    const filePath = path.join(
      __dirname,
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

module.exports = {
  // ... (previous exports)
  uploadDocument
}
