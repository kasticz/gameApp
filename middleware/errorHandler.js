const { StatusCodes } = require("http-status-codes");
const util = require('util')
const errorHandlerMiddleware = (err, req, res, next) => {
  const newError = new Error('Что то пошло не так, попробуйте ещё раз')
  newError.messages = [];
  newError.status = StatusCodes.INTERNAL_SERVER_ERROR
  if (err.name === 'ValidationError') {
    Object.values(err.errors).forEach((item) =>
      newError.messages.push(item.message)
    );
    newError.status = StatusCodes.BAD_REQUEST
  }
  if(err.code && err.code === 11000){
    Object.keys(err.keyValue).forEach(item => newError.messages.push(`Такой ${item} уже существует`))
    newError.status = StatusCodes.BAD_REQUEST
  }

  if(err.name === 'JsonWebTokenError'){
    newError.status = StatusCodes.UNAUTHORIZED
  }
  return res.status(newError.status).json({ newError });
};

module.exports = errorHandlerMiddleware;
