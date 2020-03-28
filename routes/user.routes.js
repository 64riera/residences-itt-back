const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname)
    if (ext !== '.doc' && ext !== '.docx' && ext !== '.pdf') {
      return callback(new Error('Only docs are allowed'))
    }
    callback(null, true)
  }
})

router.get('/get', userController.getUsers)

// Login & register routes
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/user', userController.getUser)

// Step 1 - Residence Request
router.post('/residence-application', userController.registerResApplication)
router.post('/file-upload', upload.single('file'), userController.uploadFileStep)

module.exports = router
