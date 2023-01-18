const express = require('express')
const {getGames,getGame} = require('../controllers/games.js')


const router = express.Router()



router.post('/games',getGames)
router.post('/game',getGame)


module.exports = router