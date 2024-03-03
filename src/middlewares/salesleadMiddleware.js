// src/middlewares/salesLeadMiddleware.js
const { body, param } = require('express-validator')

const validateCreateSalesLead = [
  body('customerId').isInt().notEmpty(),
  body('employeeId').isInt().notEmpty(),
  body('status').isString().notEmpty()
]

const validateUpdateSalesLead = [
  param('leadId').isInt().notEmpty(),
  body('customerId').isInt().notEmpty(),
  body('employeeId').isInt().notEmpty(),
  body('status').isString().notEmpty()
]

module.exports = {
  validateCreateSalesLead,
  validateUpdateSalesLead
}
