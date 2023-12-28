const express = require('express')
const router = express.Router()
const teamController = require('../controllers/teams.controller')
const { verifyToken, checkRole } = require('../middlewares/auth.middleware')

router.get('/feed', teamController.getAllTeams)
// router.get('/users/:userId/teams/:teamId', teamsController.getAllTeamsById)

// router.post(
//     '/',
//     verifyToken,
//     checkRole(['user', 'admin']),
//     tweetController.createTweet
// )

router.put(
    '/:teamId', 
    verifyToken,
    checkRole(['user', 'admin']),
    teamController.updateTeam
)

// router.delete(
//     '/:teamId',
//     verifyToken,
//     checkRole(['user', 'admin']),
//     teamController.deleteTeam
// )

module.exports = router;