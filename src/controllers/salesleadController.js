// src/controllers/salesLeadController.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getAllSalesLeads = async (req, res) => {
  try {
    const salesLeads = await prisma.salesLead.findMany()
    res.json({ salesLeads })
  } catch (error) {
    console.error('Get All Sales Leads Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getSalesLeadsByCustomerId = async (req, res) => {
  const { customerId } = req.params

  try {
    const salesLeads = await prisma.salesLead.findMany({
      where: { customerId: parseInt(customerId) }
    })

    res.json({ salesLeads })
  } catch (error) {
    console.error('Get Sales Leads by Customer ID Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getSalesLeadsByEmployeeId = async (req, res) => {
  const { employeeId } = req.params

  try {
    const salesLeads = await prisma.salesLead.findMany({
      where: { employeeId: parseInt(employeeId) }
    })

    res.json({ salesLeads })
  } catch (error) {
    console.error('Get Sales Leads by Employee ID Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const createSalesLead = async (req, res) => {
  const { customerId, employeeId, status } = req.body

  try {
    // Check if the customer and employee exist
    const existingCustomer = await prisma.customer.findUnique({
      where: { customerId: parseInt(customerId) }
    })
    const existingEmployee = await prisma.employee.findUnique({
      where: { employeeId: parseInt(employeeId) }
    })

    if (!existingCustomer || !existingEmployee) {
      return res.status(404).json({ message: 'Customer or Employee not found' })
    }

    // Create the sales lead
    const newSalesLead = await prisma.salesLead.create({
      data: {
        customerId: parseInt(customerId),
        employeeId: parseInt(employeeId),
        status
      }
    })

    res
      .status(201)
      .json({ message: 'Sales lead created successfully', newSalesLead })
  } catch (error) {
    console.error('Create Sales Lead Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const updateSalesLeadById = async (req, res) => {
  const { leadId } = req.params
  const { customerId, employeeId, status } = req.body

  try {
    // Check if the sales lead exists
    const existingSalesLead = await prisma.salesLead.findUnique({
      where: { leadId: parseInt(leadId) }
    })

    if (!existingSalesLead) {
      return res.status(404).json({ message: 'Sales lead not found' })
    }

    // Check if the customer and employee exist
    const existingCustomer = await prisma.customer.findUnique({
      where: { customerId: parseInt(customerId) }
    })
    const existingEmployee = await prisma.employee.findUnique({
      where: { employeeId: parseInt(employeeId) }
    })

    if (!existingCustomer || !existingEmployee) {
      return res.status(404).json({ message: 'Customer or Employee not found' })
    }

    // Update the sales lead
    const updatedSalesLead = await prisma.salesLead.update({
      where: { leadId: parseInt(leadId) },
      data: {
        customerId: parseInt(customerId),
        employeeId: parseInt(employeeId),
        status
      }
    })

    res.json({ message: 'Sales lead updated successfully', updatedSalesLead })
  } catch (error) {
    console.error('Update Sales Lead by ID Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getSalesLeadById = async (req, res) => {
  const { leadId } = req.params

  try {
    // Find the sales lead by ID
    const salesLead = await prisma.salesLead.findUnique({
      where: { leadId: parseInt(leadId) },
      include: {
        customer: true,
        employee: true
      }
    })

    if (!salesLead) {
      return res.status(404).json({ message: 'Sales lead not found' })
    }

    res.json({ message: 'Sales lead retrieved successfully', salesLead })
  } catch (error) {
    console.error('Get Sales Lead by ID Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  getAllSalesLeads,
  getSalesLeadsByCustomerId,
  getSalesLeadsByEmployeeId,
  createSalesLead,
  updateSalesLeadById,
  getSalesLeadById
}
