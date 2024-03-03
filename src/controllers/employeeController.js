const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createEmployee = async (req, res) => {
  const { userId, name, position, department } = req.body

  try {
    // Check if the employee exists
    const existingUser = await prisma.user.findUnique({
      where: { userId: parseInt(userId) }
    })

    if (!existingUser) {
      return res.status(404).json({ message: 'Employee not found' })
    }

    // Create expense
    const newExpense = await prisma.employee.create({
      data: {
        userId: parseInt(userId),
        name,
        position,
        department
      }
    })

    res.status(201).json({ message: 'Employee successfully created', newExpense })
  } catch (error) {
    console.error('Create Expense Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const deleteEmployeeById = async (req, res) => {
  const { employeeId } = req.params

  try {
    const employee = await prisma.employee.findUnique({
      where: { employeeId: parseInt(employeeId) }
    })

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' })
    }

    await prisma.employee.delete({
      where: { employeeId: parseInt(employeeId) }
    })

    res.json({ message: 'Employee deleted successfully' })
  } catch (error) {
    console.error('Delete Employee by ID Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany()
    res.json(employees)
  } catch (error) {
    console.error('Get All Employees Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getEmployeeById = async (req, res) => {
  const { employeeId } = req.params

  try {
    const employee = await prisma.employee.findUnique({
      where: { employeeId: parseInt(employeeId) }
    })

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' })
    }

    res.json(employee)
  } catch (error) {
    console.error('Get Employee by ID Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const updateEmployee = async (req, res) => {
  const { employeeId } = req.params
  const { name, position, department } = req.body

  try {
    // Check if the employee exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { employeeId: parseInt(employeeId) }
    })

    if (!existingEmployee) {
      return res.status(404).json({ message: 'Employee not found' })
    }

    // Update employee profile
    const updatedEmployee = await prisma.employee.update({
      where: { employeeId: parseInt(employeeId) },
      data: { name, position, department }
    })

    res.json(updatedEmployee)
  } catch (error) {
    console.error('Update Employee Profile Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  createEmployee,
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
  updateEmployee
}
