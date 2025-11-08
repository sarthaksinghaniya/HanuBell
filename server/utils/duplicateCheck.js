const Recruit = require('../models/Recruit')

const isDuplicateEmail = async (email) => {
  if (!email) return false
  const existing = await Recruit.findOne({ email: email.toLowerCase() })
  return Boolean(existing)
}

module.exports = { isDuplicateEmail }
