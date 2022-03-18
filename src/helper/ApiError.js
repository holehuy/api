class ApiError extends Error {
  constructor (statusCode, message, isOperational = true, stack = '', error = []) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.error = error
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

module.exports = ApiError
