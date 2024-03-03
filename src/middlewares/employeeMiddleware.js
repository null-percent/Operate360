const validateCreateEmployee = (req, res, next) => {
  const { userId, name, position, department } = req.body

  if (!userId || !name || !position || !department) {
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

const validateUpdateEmployee = (req, res, next) => {
  const { name, position, department } = req.body

  if (!name || !position || !department) {
    return res
      .status(400)
      .json({ message: 'At least one field is required for update' })
  }

  next()
}

module.exports = {
  validateCreateEmployee,
  validateEmployeeIdParam,
  validateUpdateEmployee
}
