require('dotenv').config();
require('express-async-errors');
const jwt = require('jsonwebtoken')
const express = require('express');
const app = express();
const authRouter = require('./routes/auth')
const dbConnect = require('./dbConnect/connect')


const notFoundMiddleware = require('./middleware/pageNotFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

app.use(express.json());
// extra packages


app.use(express.static('./public'))


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
