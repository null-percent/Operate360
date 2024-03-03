// src/routes/salesLeadRoutes.js
const express = require('express')
const {
  getAllSalesLeads,
  getSalesLeadsByCustomerId,
  getSalesLeadsByEmployeeId,
  createSalesLead,
  updateSalesLeadById,
  getSalesLeadById
} = require('../controllers/salesleadController')
const {
  validateCreateSalesLead,
  validateUpdateSalesLead
} = require('../middlewares/salesleadMiddleware')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Sales Leads
 *   description: Sales lead management
 */

/**
 * @swagger
 * /api/salesleads:
 *   get:
 *     summary: Get all sales leads
 *     tags: [Sales Leads]
 *     responses:
 *       200:
 *         description: Successful response with a list of sales leads
 *         content:
 *           application/json:
 *             example:
 *               salesLeads: [
 *                 {
 *                   leadId: 1,
 *                   customerId: 1,
 *                   employeeId: 1,
 *                   status: 'Contacted',
 *                   createdAt: "2022-01-01T00:00:00.000Z",
 *                   updatedAt: "2022-01-01T12:34:56.789Z"
 *                 },
 *                 // ... other sales leads
 *               ]
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getAllSalesLeads)

/**
 * @swagger
 * /api/salesleads/customer/{customerId}:
 *   get:
 *     summary: Get all sales leads related to a specific customer
 *     tags: [Sales Leads]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response with a list of sales leads related to the customer
 *         content:
 *           application/json:
 *             example:
 *               salesLeads: [
 *                 {
 *                   leadId: 1,
 *                   customerId: 1,
 *                   employeeId: 1,
 *                   status: 'Contacted',
 *                   createdAt: "2022-01-01T00:00:00.000Z",
 *                   updatedAt: "2022-01-01T12:34:56.789Z"
 *                 },
 *                 // ... other sales leads related to the customer
 *               ]
 *       500:
 *         description: Internal Server Error
 */
router.get('/customer/:customerId', getSalesLeadsByCustomerId)

/**
 * @swagger
 * /api/salesleads/employee/{employeeId}:
 *   get:
 *     summary: Get all sales leads related to a specific employee
 *     tags: [Sales Leads]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response with a list of sales leads related to the employee
 *         content:
 *           application/json:
 *             example:
 *               salesLeads: [
 *                 {
 *                   leadId: 1,
 *                   customerId: 1,
 *                   employeeId: 1,
 *                   status: 'Contacted',
 *                   createdAt: "2022-01-01T00:00:00.000Z",
 *                   updatedAt: "2022-01-01T12:34:56.789Z"
 *                 },
 *                 // ... other sales leads related to the employee
 *               ]
 *       500:
 *         description: Internal Server Error
 */
router.get('/employee/:employeeId', getSalesLeadsByEmployeeId)

/**
 * @swagger
 * /api/salesleads:
 *   post:
 *     summary: Create a new sales lead
 *     tags: [Sales Leads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             customerId: 1
 *             employeeId: 1
 *             status: 'Contacted'
 *     responses:
 *       201:
 *         description: Sales lead created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Sales lead created successfully"
 *               newSalesLead: {
 *                 leadId: 1,
 *                 customerId: 1,
 *                 employeeId: 1,
 *                 status: 'Contacted',
 *                 createdAt: "2022-01-01T00:00:00.000Z",
 *                 updatedAt: "2022-01-01T12:34:56.789Z"
 *               }
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Customer or Employee not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/', validateCreateSalesLead, createSalesLead)

/**
 * @swagger
 * /api/salesleads/{leadId}:
 *   put:
 *     summary: Update sales lead by ID
 *     tags: [Sales Leads]
 *     parameters:
 *       - in: path
 *         name: leadId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             customerId: 1
 *             employeeId: 1
 *             status: 'Interested'
 *     responses:
 *       200:
 *         description: Sales lead updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Sales lead updated successfully"
 *               updatedSalesLead: {
 *                 leadId: 1,
 *                 customerId: 1,
 *                 employeeId: 1,
 *                 status: 'Interested',
 *                 createdAt: "2022-01-01T00:00:00.000Z",
 *                 updatedAt: "2022-01-01T12:34:56.789Z"
 *               }
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Sales lead not found, Customer, or Employee not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:leadId', validateUpdateSalesLead, updateSalesLeadById)

/**
 * @swagger
 * /api/salesleads/{leadId}:
 *   get:
 *     summary: Get sales lead by ID
 *     tags: [Sales Leads]
 *     parameters:
 *       - in: path
 *         name: leadId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sales lead retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Sales lead retrieved successfully"
 *               salesLead: {
 *                 leadId: 1,
 *                 customerId: 1,
 *                 employeeId: 1,
 *                 status: 'Contacted',
 *                 createdAt: "2022-01-01T00:00:00.000Z",
 *                 updatedAt: "2022-01-01T12:34:56.789Z",
 *                 customer: {
 *                   customerId: 1,
 *                   name: 'Customer Name',
 *                   email: 'customer@email.com',
 *                   phone: '1234567890',
 *                   company: 'Customer Company',
 *                   createdAt: "2022-01-01T00:00:00.000Z",
 *                   updatedAt: "2022-01-01T12:34:56.789Z"
 *                 },
 *                 employee: {
 *                   employeeId: 1,
 *                   userId: 1,
 *                   // Other employee details
 *                 }
 *               }
 *       404:
 *         description: Sales lead not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:leadId', getSalesLeadById)

module.exports = router
