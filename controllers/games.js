const gameSchema = require('../mongooseSchemas/Game')
const UserSchema = require('../mongooseSchemas/User')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')



var ObjectId = require('mongoose').Types.ObjectId; 
dayjs.extend(customParseFormat)

async function getGames(req,res){
    const {uid} = req.body
    const uidObj = ObjectId(uid)
    let games = await gameSchema.find({user:uidObj})
    const username =  await UserSchema.findOne({_id:uidObj})
    if(games.length > 0){
        games = games.map((item)=>{
            item.date =  dayjs(item.date).format('DD-MM-YYYY')
            return item
        })
    }

    res.json({games,username})

}

async function getGame(req,res){

}

module.exports = {
    getGames,getGame
}