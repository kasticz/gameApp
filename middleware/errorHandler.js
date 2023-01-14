const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  const newError = new Error('Что то пошло не так, попробуйте ещё раз')
  newError.messages = [];
  if (err.name === 'ValidationError') {
    Object.values(err.errors).forEach((item) =>
      newError.messages.push(item.message)
    );
    newError.code = StatusCodes.BAD_REQUEST
  }
  if(err.code && err.code === 11000){
    Object.keys(err.keyValue).forEach(item => newError.messages.push(`Такой ${item} уже существует`))
    newError.code = StatusCodes.BAD_REQUEST
  }
  return res.status(newError.code).json({ newError });
};

module.exports = errorHandlerMiddleware;
