// src/controllers/customerController.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getAllCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany()
    res.json({ customers })
  } catch (error) {
    console.error('Get All Customers Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const createCustomer = async (req, res) => {
  const { name, email, phone, company } = req.body

  try {
    const newCustomer = await prisma.customer.create({
      data: { name, email, phone, company }
    })

    res
      .status(201)
      .json({ message: 'Customer created successfully', newCustomer })
  } catch (error) {
    console.error('Create Customer Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getCustomerById = async (req, res) => {
  const { customerId } = req.params

  try {
    const customer = await prisma.customer.findUnique({
      where: { customerId: parseInt(customerId) }
    })

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }

    res.json({ customer })
  } catch (error) {
    console.error('Get Customer by ID Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const updateCustomerById = async (req, res) => {
  const { customerId } = req.params
  const { name, email, phone, company } = req.body

  try {
    const existingCustomer = await prisma.customer.findUnique({
      where: { customerId: parseInt(customerId) }
    })

    if (!existingCustomer) {
      return res.status(404).json({ message: 'Customer not found' })
    }

    const updatedCustomer = await prisma.customer.update({
      where: { customerId: parseInt(customerId) },
      data: { name, email, phone, company }
    })

    res.json({ message: 'Customer updated successfully', updatedCustomer })
  } catch (error) {
    console.error('Update Customer by ID Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const deleteCustomerById = async (req, res) => {
  const { customerId } = req.params

  try {
    const existingCustomer = await prisma.customer.findUnique({
      where: { customerId: parseInt(customerId) }
    })

    if (!existingCustomer) {
      return res.status(404).json({ message: 'Customer not found' })
    }

    await prisma.customer.delete({
      where: { customerId: parseInt(customerId) }
    })

    res.json({ message: 'Customer deleted successfully' })
  } catch (error) {
    console.error('Delete Customer by ID Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  getAllCustomers,
  createCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById
}
