const gameSchema = require('../mongooseSchemas/Game')
const UserSchema = require('../mongooseSchemas/User')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const { StatusCodes } = require("http-status-codes");
let ObjectId = require('mongoose').Types.ObjectId; 

dayjs.extend(customParseFormat)

async function getGames(req,res){
    const {uid} = req.body
    const uidObj = ObjectId(uid)
    let games = await gameSchema.find({user:uidObj}).populate('user')
    if(games.length > 0){
        games = games.map((item)=>{
            item.date =  dayjs(item.date).format('DD-MM-YYYY')
            return item
        })
    }
    games = games.map((item)=>{
        const d = item.descr
        if(d && d.length > 200){
            item.descr = `${d.slice(0,198)}...`
        }
        return item
    })

    res.status(StatusCodes.OK).json({games})

}

async function getGame(req,res){
    const {gameUid} = req.body
    const gameUidObj = ObjectId(gameUid)
    let game = await gameSchema.findOne({_id:gameUidObj})

    res.status(StatusCodes.OK).json(game)
}
async function editGame(req,res){
    const {gameObj} = req.body
    const gameUidObj = ObjectId(gameObj.gameUid)    
    const updatedGameDB = await gameSchema.updateOne({_id:gameUidObj},gameObj)

    res.status(StatusCodes.OK).json({updatedGameDB})
}


async function createGame(req,res){
    const {gameObj} = req.body
    const userUidObj = ObjectId(gameObj.user)    
    gameObj.user = userUidObj
    const createdGame = await gameSchema.create(gameObj)

    res.status(StatusCodes.OK).json({createdGame})
}

async function deleteGame(req,res){
    const {gameUid} = req.body
    const userUidObj = ObjectId(gameUid)    
    const deletedGame = await gameSchema.deleteOne({_id:userUidObj})

    res.status(StatusCodes.OK).json({deletedGame})
}


module.exports = {
    getGames,getGame,editGame,createGame,deleteGame
}