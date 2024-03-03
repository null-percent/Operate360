// src/middlewares/customerMiddleware.js
const validateCreateCustomer = (req, res, next) => {
  const { name, email, phone, company } = req.body

  if (!name || !email || !phone || !company) {
    return res
      .status(400)
      .json({ message: 'All fields are required for customer creation' })
  }

  next()
}

module.exports = {
  validateCreateCustomer
}
