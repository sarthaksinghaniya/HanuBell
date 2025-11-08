const express = require('express')
const Recruit = require('../models/Recruit')

const router = express.Router()

const authenticate = (req, res, next) => {
  const token = req.headers['x-admin-token'] || req.query.token
  if (!process.env.ADMIN_PASS) {
    return res.status(500).json({ success: false, message: 'Admin access is not configured.' })
  }

  if (!token || token !== process.env.ADMIN_PASS) {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }

  next()
}

router.get('/submissions', authenticate, async (_req, res) => {
  try {
    const submissions = await Recruit.find().sort({ createdAt: -1 })
    res.json({ success: true, data: submissions })
  } catch (error) {
    console.error('Admin fetch error:', error)
    res.status(500).json({ success: false, message: 'Unable to fetch submissions.' })
  }
})

module.exports = router
