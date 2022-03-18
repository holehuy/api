const express = require('express')
const winston = require('winston')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const httpStatus = require('http-status')
const routes = require('./route')
const db = require('./database')
const authConfig = require('./config/auth')
const { jwtStrategy } = require('./config/passport')
const { ApiError } = require('./helper')
const { errorConverter, errorHandler } = require('./middleware/error.middleware')

const app = express()

// global middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: authConfig.corsWhiteURL, credentials: true }))
app.options('*', cors())
app.use(session({ secret: authConfig.jwtSecretKey, cookie: { maxAge: 300000 } }))
app.use(passport.initialize())
passport.use(jwtStrategy)

app.get('/', (req, res) => {
  res.send('Ok')
})

// v1 api routes
app.use('/v1', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// converter error to ApiError, if needed
app.use(errorConverter)
// hanle error
app.use(errorHandler)
// start some thing first
const start = async () => {
  // connect db
  await db.main.init()
}

start().catch(err => {
  winston.error(err)
  process.exit()
})

module.exports = app
