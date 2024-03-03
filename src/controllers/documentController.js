// src/controllers/documentController.js
const { PrismaClient } = require('@prisma/client')
const multer = require('multer')
const path = require('path')

const prisma = new PrismaClient()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/documents'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

const uploadDocument = async (req, res) => {
  const { employeeId, title, description } = req.body

  try {
    const employee = await prisma.employee.findUnique({
      where: { employeeId: parseInt(employeeId) }
    })

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' })
    }

    // Assuming 'file' is the field name for the document/file in the form
    if (!req.file) {
      return res.status(400).json({ message: 'No document uploaded' })
    }

    const document = await prisma.document.create({
      data: {
        title,
        description,
        fileUrl: req.file.path,
        employee: {
          connect: {
            employeeId: parseInt(employeeId)
          }
        }
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
  uploadDocument,
  upload
}
