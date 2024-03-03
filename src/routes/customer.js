// src/routes/customerRoutes.js
const express = require('express')
const {
  getAllCustomers,
  createCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById
} = require('../controllers/customerController')
const { validateCreateCustomer } = require('../middlewares/customerMiddleware')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management
 */

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Successful response with a list of customers
 *         content:
 *           application/json:
 *             example:
 *               customers: [
 *                 {
 *                   customerId: 1,
 *                   name: 'Customer A',
 *                   email: 'customerA@example.com',
 *                   phone: '123-456-7890',
 *                   company: 'Company A',
 *                   createdAt: "2022-01-01T00:00:00.000Z",
 *                   updatedAt: "2022-01-01T12:34:56.789Z"
 *                 },
 *                 // ... other customers
 *               ]
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getAllCustomers)

/**
 * @swagger
 * /api/customers/create:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               company:
 *                 type: string
 *             example:
 *               name: 'New Customer'
 *               email: 'newcustomer@example.com'
 *               phone: '987-654-3210'
 *               company: 'New Company'
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Customer created successfully"
 *               newCustomer: {
 *                 customerId: 2,
 *                 name: 'New Customer',
 *                 email: 'newcustomer@example.com',
 *                 phone: '987-654-3210',
 *                 company: 'New Company',
 *                 createdAt: "2022-01-02T12:00:00.000Z",
 *                 updatedAt: "2022-01-02T12:34:56.789Z"
 *               }
 *       400:
 *         description: All fields are required for customer creation
 *       500:
 *         description: Internal Server Error
 */
router.post('/create', validateCreateCustomer, createCustomer)

/**
 * @swagger
 * /api/customers/{customerId}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response with customer details
 *         content:
 *           application/json:
 *             example:
 *               customer: {
 *                 customerId: 1,
 *                 name: 'Customer A',
 *                 email: 'customerA@example.com',
 *                 phone: '123-456-7890',
 *                 company: 'Company A',
 *                 createdAt: "2022-01-01T00:00:00.000Z",
 *                 updatedAt: "2022-01-01T12:34:56.789Z"
 *               }
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:customerId', getCustomerById)

/**
 * @swagger
 * /api/customers/{customerId}/update:
 *   put:
 *     summary: Update customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customerId
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               company:
 *                 type: string
 *             example:
 *               name: 'Updated Customer A'
 *               email: 'updatedcustomerA@example.com'
 *               phone: '987-654-3210'
 *               company: 'Updated Company A'
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Customer updated successfully"
 *               updatedCustomer: {
 *                 customerId: 1,
 *                 name: 'Updated Customer A',
 *                 email: 'updatedcustomerA@example.com',
 *                 phone: '987-654-3210',
 *                 company: 'Updated Company A',
 *                 createdAt: "2022-01-01T00:00:00.000Z",
 *                 updatedAt: "2022-01-02T12:34:56.789Z"
 *               }
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:customerId/update', updateCustomerById)

/**
 * @swagger
 * /api/customers/{customerId}:
 *   delete:
 *     summary: Delete customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Customer deleted successfully"
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:customerId', deleteCustomerById)

module.exports = router
