const express = require('express')
const multer = require('multer')
var cors = require('cors')
var app = express()
app.use(cors())

const router = express.Router()
const usersController = require('../controllers/users.controller.js')
const { verifyToken, checkRole } = require("../middlewares/auth.middleware.js")

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });



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

router.put(
    '/:userId/avatar',
    upload.single('avatar'),
    verifyToken,
    checkRole(['user', 'admin']),
    usersController.updateUserAvatar
)

router.delete(
    '/:userId',
    verifyToken,
    checkRole(['user', 'admin']),
    usersController.deleteUser
)

module.exports = router