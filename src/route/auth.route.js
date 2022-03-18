const express = require('express')

const { passportService } = require('../service')
const { authController } = require('../controller')
const googleConfig = require('../config/google')
const { validate } = require('../middleware')
const { authValidation } = require('../validation')
const passport = require('passport')

const router = express.Router()
router.use(passport.session())

function isLoggedIn (req, res, next) {
  req.user ? next() : res.sendStatus(401)
}
router.get(
  '/google',
  passportService.authenticate('google', {
    scope: ['profile', 'email']
  }, (req, res) => {
    console.log(req)
  })
)

router.get('/google/callback', passportService.authenticate('google', {
  failureRedirect: googleConfig.failureRedirect,
  successRedirect: googleConfig.successRedirect
}))

router.get('/user', isLoggedIn, authController.loginWithGoogle)

router.get('/failure', (req, res) => {
  res.sendStatus(401)
})

router.post('/logout', validate(authValidation.logout), authController.logout)
module.exports = router
