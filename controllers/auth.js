const UserSchema = require('../mongooseSchemas/User')
const jwt = require('jsonwebtoken')
const statusCodes = require('http-status-codes')


async function login(req,res){
    const {login,password} = req.body
    console.log(login,password)
    res.status(200).send('5')
}

async function register(req,res){
    const user = req.body
    const newUser = await UserSchema.create(user)
    const {login,email} = newUser
    const token = jwt.sign({login,email},process.env.JWT_SECRET,{
        expiresIn: '7d'
    })

    res.status(statusCodes.StatusCodes.CREATED).json({msg:'Пользователь создан',token})
}
async function validateToken(req,res){
    const {token} = req.body
    const result = jwt.verify(token,process.env.JWT_SECRET)
    res.json(result)
}




module.exports = {
    login,register,validateToken
}