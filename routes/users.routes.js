const express  = require('express')
var cors = require('cors')
var app = express()
app.use(cors())

const router = express.Router()
const usersController = require('../controllers/users.controller.js')
const { verifyToken, checkRole } = require("../middlewares/auth.middleware.js")

router.get('/', usersController.getAllUsers)
router.get('/:userId', usersController.getUserById)
router.post('/verify/:userId', usersController.verifyByUserId)

router.post(
    '/',
    verifyToken,
    checkRole(['admin']),
    usersController.createUser
)

router.put(
    '/:userId',
    verifyToken,
    checkRole(['user', 'admin']),
    usersController.updateUser
)

router.delete(
    '/:userId',
    verifyToken,
    checkRole(['user', 'admin']),
    usersController.deleteUser
)

module.exports = router