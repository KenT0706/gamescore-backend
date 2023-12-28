// Implement Controllers and Routes

//    - Implement user controllers
//    - Implement tweet controllers
//    - Implement reply controllers
//    - Implement like controllers
//    - Implement follow controllers

const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.post('/login', authController.login)
router.post('/register', authController.register)

module.exports = router;