const express = require('express')
const { body, validationResult } = require('express-validator')
const path = require('path')
const fs = require('fs')

const Recruit = require('../models/Recruit')
const upload = require('../utils/fileUpload')
const sendEmail = require('../utils/sendEmail')
const appendToExcel = require('../utils/excelWriter')
const { isDuplicateEmail } = require('../utils/duplicateCheck')

const router = express.Router()

const validators = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('collegeName').trim().notEmpty().withMessage('College name is required'),
  body('degree').trim().notEmpty().withMessage('Degree is required'),
  body('yearOfStudy').trim().notEmpty().withMessage('Year of study is required'),
  body('course').trim().notEmpty().withMessage('Course is required'),
  body('linkedin').trim().notEmpty().withMessage('LinkedIn profile is required'),
  body('github').optional().trim(),
  body('portfolio').optional().trim(),
  body('codingSkills').trim().notEmpty().withMessage('Coding skills are required'),
  body('cocurricularSkills').trim().notEmpty().withMessage('Co-curricular skills are required'),
  body('experience').optional().trim(),
  body('preferredDomain').trim().notEmpty().withMessage('Preferred domain is required'),
  body('otherDomain').optional().trim(),
  body('terms').equals('true').withMessage('You must accept the terms and conditions')
]

router.post(
  '/',
  upload.single('paymentScreenshot'),
  validators,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      if (req.file) {
        fs.unlink(req.file.path, () => {})
      }
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    try {
      const isDuplicate = await isDuplicateEmail(req.body.email)
      if (isDuplicate) {
        if (req.file) {
          fs.unlink(req.file.path, () => {})
        }
        return res.status(409).json({ success: false, message: 'Email already registered.' })
      }

      if (!req.file) {
        return res.status(400).json({ success: false, message: 'Payment screenshot is required.' })
      }

      const whatsappLink = process.env.WHATSAPP_LINK || 'https://chat.whatsapp.com/'
      const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER

      // Prepare data for MongoDB
      const recruitData = {
        name: req.body.fullName,
        email: req.body.email,
        mobile: req.body.phone,
        college: req.body.collegeName,
        degree: req.body.degree,
        year: req.body.yearOfStudy,
        course: req.body.course,
        linkedin: req.body.linkedin,
        github: req.body.github,
        portfolio: req.body.portfolio,
        experience: req.body.experience,
        skills: req.body.codingSkills,
        cocurricularSkills: req.body.cocurricularSkills,
        sector: req.body.preferredDomain,
        otherSector: req.body.otherDomain,
        paymentScreenshot: req.file ? req.file.filename : '',
        paymentTxnId: req.body.paymentTxnId || '',
      };

      // Save to MongoDB
      const newRecruit = new Recruit(recruitData);
      await newRecruit.save();

      // Save to Excel
      await appendToExcel(recruitData);

      const logoCandidates = [
        path.join(__dirname, '..', 'assets', 'hanubell-logo.jpg'),
        path.join(__dirname, '..', '..', 'client', 'src', 'assets', 'hanubell-logo.jpg'),
        path.join(__dirname, '..', '..', 'client', 'public', 'hanubell-logo.jpg'),
      ]
      const logoPath = logoCandidates.find((candidate) => fs.existsSync(candidate))
      const logoAttachment =
        logoPath && !fs.lstatSync(logoPath).isDirectory()
          ? {
              filename: 'hanubell-logo.jpg',
              path: logoPath,
              cid: 'hanubellLogo',
            }
          : null
      const logoImgTag = logoAttachment
        ? `<img src="cid:${logoAttachment.cid}" alt="HanuBell" style="width:120px; margin-bottom:16px;" />`
        : ''

      const applicantHtml = `
        <div style="font-family: 'Inter', Arial, sans-serif; color: #0f172a;">
          <div style="padding: 24px; border-radius: 18px; background: linear-gradient(180deg, rgba(167,199,231,.16), rgba(250,218,221,.18));">
            ${logoImgTag}
            <h2 style="font-family: 'Poppins', Arial, sans-serif; color:#6c5ae0;">Welcome to HanuBell Recruitment 2025 🎉</h2>
            <p>Hello ${payload.name},</p>
            <p>Thank you for registering for <strong>HanuBell Recruitment 2025</strong>! We’re thrilled to explore your profile and welcome you into our innovation-first community.</p>
            <p><strong>Next steps:</strong></p>
            <ul>
              <li>Join the Interview WhatsApp Group: <a href="${whatsappLink}">Click here</a></li>
              <li>Keep an eye on your inbox for interview schedules and project briefs.</li>
            </ul>
            <p><strong>Your submitted details:</strong></p>
            <ul>
              <li>Name: ${payload.name}</li>
              <li>College: ${payload.college}</li>
              <li>Preferred Sector: ${payload.sector}</li>
            </ul>
            <p>If you have any questions, write to <a href="mailto:teamhanubell@gmail.com">teamhanubell@gmail.com</a>.</p>
            <p>Warm regards,<br/>Team HanuBell 🌸</p>
          </div>
        </div>
      `

      const adminHtml = `
        <div style="font-family: 'Inter', Arial, sans-serif; color: #0f172a;">
          <h2 style="font-family: 'Poppins', Arial, sans-serif; color:#6c5ae0;">New Recruitment Submission</h2>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>College:</strong> ${payload.college}</p>
          <p><strong>Preferred Sector:</strong> ${payload.sector}</p>
          <p><strong>Payment Txn ID:</strong> ${payload.paymentTxnId || 'N/A'}</p>
          <p><strong>LinkedIn:</strong> ${payload.linkedin}</p>
          <p><strong>GitHub:</strong> ${payload.github || 'N/A'}</p>
          <p><strong>Portfolio:</strong> ${payload.portfolio || 'N/A'}</p>
          <p>View payment screenshot attached.</p>
        </div>
      `

      if (!adminEmail) {
        console.warn('ADMIN_EMAIL or EMAIL_USER is not configured. Admin notification email will be skipped.')
      }

      await sendEmail({
        to: recruit.email,
        subject: '🎉 Welcome to HanuBell Recruitment 2025',
        html: applicantHtml,
        attachments: logoAttachment ? [logoAttachment] : undefined,
      })

      if (adminEmail) {
        await sendEmail({
          to: adminEmail,
          subject: `New HanuBell applicant: ${payload.name}`,
          html: adminHtml,
          attachments: [
            {
              filename: path.basename(req.file.path),
              path: req.file.path,
            },
          ],
        })
      }

      return res.json({ success: true, whatsappLink, recruitId: recruit.id })
    } catch (error) {
      console.error('Registration error:', error)
      if (req.file) {
        fs.unlink(req.file.path, () => {})
      }
      return res.status(500).json({ success: false, message: 'Unable to complete registration.' })
    }
  }
)

module.exports = router
