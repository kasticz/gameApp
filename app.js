require('dotenv').config();
require('express-async-errors');
const jwt = require('jsonwebtoken')
const express = require('express');
const app = express();
const authRouter = require('./routes/auth')
const gamesRouter = require('./routes/games')
const dbConnect = require('./dbConnect/connect')
const path = require('path')
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


const notFoundMiddleware = require('./middleware/pageNotFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, 
    max: 200, 
  })
);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());




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
app.get('/game',(req,res)=>{
  res.sendFile(path.join(__dirname +'/public/game.html'))
})


app.use('/auth',authRouter)
app.use('/api/gamesAPI',gamesRouter)
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
