const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads', 'paymentProofs'))
  },
  filename: (_req, file, cb) => {
    const timestamp = Date.now()
    const ext = path.extname(file.originalname)
    const baseName = path.parse(file.originalname).name.replace(/\s+/g, '-').toLowerCase()
    cb(null, `${baseName}-${timestamp}${ext}`)
  },
})

const fileFilter = (_req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowed.includes(file.mimetype)) {
    cb(new Error('Unsupported file type. Please upload JPG, PNG, or WEBP image.'))
    return
  }
  cb(null, true)
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
})

module.exports = upload
