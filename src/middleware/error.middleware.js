const httpStatus = require('http-status')
const sequelize = require('sequelize')
const winston = require('winston')

const { ApiError } = require('../helper')

const errorConverter = (err, req, res, next) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error instanceof sequelize.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message, false, err.stack, err.error)
  }
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err
  res.locals.errorMessage = err.message
  const response = {
    code: statusCode,
    message,
    stack: err.stack,
    error: err.error
  }

  winston.error(err)

  res.status(statusCode).json(response)
}

module.exports = {
  errorConverter,
  errorHandler
}
