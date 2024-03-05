// src/index.js
const express = require('express')
const bodyParser = require('body-parser')
const { specs, swaggerUi } = require('./swagger/swagger')
const app = express()
const PORT = process.env.PORT || 3000
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')
const customerRoutes = require('./routes/customer')
const salesLeadRoutes = require('./routes/saleslead')
const employeeRoutes = require('./routes/employee')

app.use(bodyParser.json())

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/expenses', expenseRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/salesleads', salesLeadRoutes)
app.use('/api/employees', employeeRoutes)

app.get('/', (req, res) => {
  res.send('Hello, Operate360!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
