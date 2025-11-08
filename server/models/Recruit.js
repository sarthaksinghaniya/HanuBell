const mongoose = require('mongoose')

const recruitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    college: { type: String, required: true },
    degree: { type: String, required: true },
    year: { type: String, required: true },
    course: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    linkedin: { type: String, required: true },
    github: { type: String },
    portfolio: { type: String },
    experience: { type: String },
    skills: { type: String },
    sector: { type: String, required: true },
    otherSector: { type: String },
    paymentScreenshot: { type: String, required: true },
    paymentTxnId: { type: String },
    whatsappLink: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Recruit', recruitSchema)
