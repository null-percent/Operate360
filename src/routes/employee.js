const express = require('express')
const {
  createEmployee,
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
  updateEmployee
} = require('../controllers/employeeController')

const {
  validateCreateEmployee,
  validateEmployeeIdParam,
  validateUpdateEmployee
} = require('../middlewares/employeeMiddleware')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management
 */

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of all employees
 *         content:
 *           application/json:
 *             example:
 *               - employeeId: 1
 *                 userId: 1
 *                 name: "Kukuh"
 *                 position: "Office Boy"
 *                 department: "Cleaning Safety"
 *                 createdAt: "2022-01-01T00:00:00.000Z"
 *                 updatedAt: "2022-01-01T12:34:56.789Z"
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getAllEmployees)

/**
 * @swagger
 * /api/employees/create:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               name:
 *                 type: string
 *               department:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               position:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             example:
 *               employeeId: 3
 *               userId: 3
 *               name: "Kukuh"
 *               position: "Office Boy"
 *               department: "Cleaning Safety"
 *               createdAt: "2022-01-01T00:00:00.000Z"
 *               updatedAt: "2022-01-01T12:34:56.789Z"
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/create', validateCreateEmployee, createEmployee)

/**
 * @swagger
 * /api/employees/employee/{employeeId}:
 *   get:
 *     summary: Get all employees related to a specific employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of employees related to the employee
 *         content:
 *           application/json:
 *             example:
 *               - employeeId: 3
 *                 userId: 3
 *                 name: "Kukuh"
 *                 position: "Office Boy"
 *                 department: "Cleaning Safety"
 *                 createdAt: "2022-01-01T00:00:00.000Z"
 *                 updatedAt: "2022-01-01T12:34:56.789Z"
 *       400:
 *         description: Invalid employeeId parameter
 *       500:
 *         description: Internal Server Error
 */
router.get(
  '/employee/:employeeId',
  validateEmployeeIdParam,
  getEmployeeById
)

/**
 * @swagger
 * /api/employees/{employeeId}:
 *   get:
 *     summary: Get employee details by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee details
 *         content:
 *           application/json:
 *             example:
 *               employeeId: 1
 *               userId: 3
 *               name: "Kukuh"
 *               position: "Office Boy"
 *               department: "Cleaning Safety"
 *               createdAt: "2022-01-01T00:00:00.000Z"
 *               updatedAt: "2022-01-01T12:34:56.789Z"
 *       404:
 *         description: Employee not found
 *       400:
 *         description: Invalid employeeId parameter
 *       500:
 *         description: Internal Server Error
 */
router.get('/:employeeId', validateEmployeeIdParam, getEmployeeById)

/**
 * @swagger
 * /api/employees/{employeeId}:
 *   delete:
 *     summary: Delete employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Employee deleted successfully"
 *       404:
 *         description: Employee not found
 *       400:
 *         description: Invalid employeeId parameter
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:employeeId', validateEmployeeIdParam, deleteEmployeeById)

/**
 * @swagger
 * /api/employees/{employeeId}:
 *   put:
 *     summary: Update employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *            properties:
 *               name:
 *                 type: string
 *               department:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               position:
 *                 type: string
 *             example:
 *               amount: 120.00
 *               category: 'Office Supplies'
 *               date: "2022-01-01T12:00:00.000Z"
 *               description: 'Updated employee details'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Employee updated successfully"
 *               updatedEmployee:
 *                 employeeId: 1
 *                 userId: 3
 *                 name: "Kukuh"
 *                 position: "Office Boy"
 *                 department: "Cleaning Safety"
 *                 createdAt: "2022-01-01T00:00:00.000Z"
 *                 updatedAt: "2022-01-01T12:34:56.789Z"
 *       400:
 *         description: At least one field is required for update
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  '/:employeeId',
  validateEmployeeIdParam,
  validateUpdateEmployee,
  updateEmployee
)

module.exports = router
