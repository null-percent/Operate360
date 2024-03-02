// src/controllers/expenseController.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany()
    res.json(expenses)
  } catch (error) {
    console.error('Get All Expenses Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const createExpense = async (req, res) => {
  const { employeeId, amount, category, date, description } = req.body

  try {
    // Check if the employee exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { employeeId: parseInt(employeeId) }
    })

    if (!existingEmployee) {
      return res.status(404).json({ message: 'Employee not found' })
    }

    // Create expense
    const newExpense = await prisma.expense.create({
      data: {
        employeeId: parseInt(employeeId),
        amount,
        category,
        date,
        description
      }
    })

    res.status(201).json({ message: 'Create Expense successfully', newExpense })
  } catch (error) {
    console.error('Create Expense Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getExpensesByEmployeeId = async (req, res) => {
  const { employeeId } = req.params

  // Check if the employee exists
  const existingEmployee = await prisma.employee.findUnique({
    where: { employeeId: parseInt(employeeId) }
  })

  if (!existingEmployee) {
    return res.status(404).json({ message: 'Employee not found' })
  }

  try {
    const expenses = await prisma.expense.findMany({
      where: { employeeId: parseInt(employeeId) }
    })

    res.json(expenses)
  } catch (error) {
    console.error('Get Expenses by Employee ID Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getExpenseById = async (req, res) => {
  const { expenseId } = req.params

  try {
    const expense = await prisma.expense.findUnique({
      where: { expenseId: parseInt(expenseId) }
    })

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' })
    }

    res.json(expense)
  } catch (error) {
    console.error('Get Expense by ID Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const deleteExpenseById = async (req, res) => {
  const { expenseId } = req.params

  try {
    const expense = await prisma.expense.findUnique({
      where: { expenseId: parseInt(expenseId) }
    })

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' })
    }

    await prisma.expense.delete({
      where: { expenseId: parseInt(expenseId) }
    })

    res.json({ message: 'Expense deleted successfully' })
  } catch (error) {
    console.error('Delete Expense by ID Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const updateExpenseById = async (req, res) => {
  const { expenseId } = req.params
  const { amount, category, date, description } = req.body

  try {
    // Check if the expense exists
    const existingExpense = await prisma.expense.findUnique({
      where: { expenseId: parseInt(expenseId) }
    })

    if (!existingExpense) {
      return res.status(404).json({ message: 'Expense not found' })
    }

    // Update the expense
    const updatedExpense = await prisma.expense.update({
      where: { expenseId: parseInt(expenseId) },
      data: { amount, category, date, description }
    })

    res.json({ message: 'Expense updated successfully', updatedExpense })
  } catch (error) {
    console.error('Update Expense by ID Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  getAllExpenses,
  createExpense,
  getExpensesByEmployeeId,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById
}
