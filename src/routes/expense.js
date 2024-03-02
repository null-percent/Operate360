const express = require('express')
const {
  getAllExpenses,
  createExpense,
  getExpensesByEmployeeId,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById
} = require('../controllers/expenseController')
const {
  validateCreateExpense,
  validateEmployeeIdParam,
  validateExpenseIdParam,
  validateUpdateExpense
} = require('../middlewares/expenseMiddleware')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense management
 */

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get all expenses
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: List of all expenses
 *         content:
 *           application/json:
 *             example:
 *               - expenseId: 1
 *                 employeeId: 1
 *                 amount: 100.00
 *                 category: 'Office Supplies'
 *                 date: "2022-01-01T12:00:00.000Z"
 *                 description: 'Purchased office supplies'
 *                 createdAt: "2022-01-01T00:00:00.000Z"
 *                 updatedAt: "2022-01-01T12:34:56.789Z"
 *               - expenseId: 2
 *                 employeeId: 2
 *                 amount: 75.50
 *                 category: 'Travel'
 *                 date: "2022-01-02T15:30:00.000Z"
 *                 description: 'Business trip expenses'
 *                 createdAt: "2022-01-02T00:00:00.000Z"
 *                 updatedAt: "2022-01-02T12:34:56.789Z"
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getAllExpenses)

/**
 * @swagger
 * /api/expenses/create:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: integer
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Expense created successfully
 *         content:
 *           application/json:
 *             example:
 *               expenseId: 3
 *               employeeId: 1
 *               amount: 50.00
 *               category: 'Miscellaneous'
 *               date: "2022-01-03T09:45:00.000Z"
 *               description: 'Miscellaneous expense'
 *               createdAt: "2022-01-03T00:00:00.000Z"
 *               updatedAt: "2022-01-03T12:34:56.789Z"
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/create', validateCreateExpense, createExpense)

/**
 * @swagger
 * /api/expenses/employee/{employeeId}:
 *   get:
 *     summary: Get all expenses related to a specific employee
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of expenses related to the employee
 *         content:
 *           application/json:
 *             example:
 *               - expenseId: 1
 *                 employeeId: 1
 *                 amount: 100.00
 *                 category: 'Office Supplies'
 *                 date: "2022-01-01T12:00:00.000Z"
 *                 description: 'Purchased office supplies'
 *                 createdAt: "2022-01-01T00:00:00.000Z"
 *                 updatedAt: "2022-01-01T12:34:56.789Z"
 *               - expenseId: 2
 *                 employeeId: 1
 *                 amount: 75.50
 *                 category: 'Travel'
 *                 date: "2022-01-02T15:30:00.000Z"
 *                 description: 'Business trip expenses'
 *                 createdAt: "2022-01-02T00:00:00.000Z"
 *                 updatedAt: "2022-01-02T12:34:56.789Z"
 *       400:
 *         description: Invalid employeeId parameter
 *       500:
 *         description: Internal Server Error
 */
router.get(
  '/employee/:employeeId',
  validateEmployeeIdParam,
  getExpensesByEmployeeId
)

/**
 * @swagger
 * /api/expenses/{expenseId}:
 *   get:
 *     summary: Get expense details by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: expenseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expense details
 *         content:
 *           application/json:
 *             example:
 *               expenseId: 1
 *               employeeId: 1
 *               amount: 100.00
 *               category: 'Office Supplies'
 *               date: "2022-01-01T12:00:00.000Z"
 *               description: 'Purchased office supplies'
 *               createdAt: "2022-01-01T00:00:00.000Z"
 *               updatedAt: "2022-01-01T12:34:56.789Z"
 *       404:
 *         description: Expense not found
 *       400:
 *         description: Invalid expenseId parameter
 *       500:
 *         description: Internal Server Error
 */
router.get('/:expenseId', validateExpenseIdParam, getExpenseById)

/**
 * @swagger
 * /api/expenses/{expenseId}:
 *   delete:
 *     summary: Delete expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: expenseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Expense deleted successfully"
 *       404:
 *         description: Expense not found
 *       400:
 *         description: Invalid expenseId parameter
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:expenseId', validateExpenseIdParam, deleteExpenseById)

/**
 * @swagger
 * /api/expenses/{expenseId}:
 *   put:
 *     summary: Update expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: expenseId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *             example:
 *               amount: 120.00
 *               category: 'Office Supplies'
 *               date: "2022-01-01T12:00:00.000Z"
 *               description: 'Updated expense details'
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Expense updated successfully"
 *               updatedExpense:
 *                 expenseId: 1
 *                 employeeId: 1
 *                 amount: 120.00
 *                 category: 'Office Supplies'
 *                 date: "2022-01-01T12:00:00.000Z"
 *                 description: 'Updated expense details'
 *                 createdAt: "2022-01-01T00:00:00.000Z"
 *                 updatedAt: "2022-01-01T12:34:56.789Z"
 *       400:
 *         description: At least one field is required for update
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  '/:expenseId',
  validateExpenseIdParam,
  validateUpdateExpense,
  updateExpenseById
)

module.exports = router
