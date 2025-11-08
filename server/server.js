const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const registerRoutes = require('./routes/register')
const adminRoutes = require('./routes/admin')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(helmet())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/register', registerRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (_req, res) => {
  res.json({ status: 'HanuBell recruitment API is running' })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
