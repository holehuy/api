const express = require('express')
const { userController } = require('../controller')

const { validate } = require('../middleware')
const { userValidation } = require('../validation')
const { auth } = require('../middleware/auth.middleware')
const router = express.Router()

router.route('/profile')
  .get(auth('getProfile'), userController.getCurrentUserProfileHandler)
  .patch(auth('getProfile'), validate(userValidation.updateMyProfile), userController.updateMyProfile)

router.post('/slack', auth('getProfile'), validate(userValidation.fetchInfoFromSlack), userController.fetchInfoFromSlack)

module.exports = router
