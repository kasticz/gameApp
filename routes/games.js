const express = require('express')
const {getGames,getGame,editGame,createGame,deleteGame} = require('../controllers/games.js')


const router = express.Router()



router.post('/games',getGames)
router.post('/game',getGame)
router.post('/editGame',editGame)
router.post('/createGame',createGame)
router.post('/deleteGame',deleteGame)





module.exports = router