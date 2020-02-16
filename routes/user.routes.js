const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.get('/get', userController.getUsers)

// Login & register routes
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)

// Step 1 - Residence Request
router.post('/residence-application', userController.registerResApplication)

module.exports = router