require('dotenv').config();
require('express-async-errors');
const jwt = require('jsonwebtoken')
const express = require('express');
const app = express();
const authRouter = require('./routes/auth')
const dbConnect = require('./dbConnect/connect')
const path = require('path')


const notFoundMiddleware = require('./middleware/pageNotFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

app.use(express.json());
// extra packages


app.use(express.static('./public'))

app.get('/login',(req,res)=>{
  res.sendFile(path.join(__dirname +'/public/login.html'))
})
app.get('/register',(req,res)=>{
  res.sendFile(path.join(__dirname +'/public/register.html'))
})
app.get('/games',(req,res)=>{
  res.sendFile(path.join(__dirname +'/public/games.html'))
})
app.get('/:gameId',(req,res)=>{
  res.sendFile(path.join(__dirname +'/public/game.html'))
})


app.use('/auth',authRouter)
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await dbConnect(process.env.MONGO_URI)
    app.listen(port)

  } catch (error) {
    console.log(error);
  }
};

start();
