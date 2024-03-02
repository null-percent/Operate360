// src/middlewares/expenseMiddleware.js
const validateCreateExpense = (req, res, next) => {
  const { employeeId, amount, category, date, description } = req.body

  if (!employeeId || !amount || !category || !date || !description) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  next()
}

const validateEmployeeIdParam = (req, res, next) => {
  const { employeeId } = req.params

  if (!employeeId || isNaN(parseInt(employeeId))) {
    return res.status(400).json({ message: 'Invalid employeeId parameter' })
  }

  next()
}

const validateExpenseIdParam = (req, res, next) => {
  const { expenseId } = req.params

  if (!expenseId || isNaN(parseInt(expenseId))) {
    return res.status(400).json({ message: 'Invalid expenseId parameter' })
  }

  next()
}

const validateUpdateExpense = (req, res, next) => {
  const { amount, category, date, description } = req.body

  if (!amount && !category && !date && !description) {
    return res
      .status(400)
      .json({ message: 'At least one field is required for update' })
  }

  next()
}

module.exports = {
  validateCreateExpense,
  validateEmployeeIdParam,
  validateExpenseIdParam,
  validateUpdateExpense
}
