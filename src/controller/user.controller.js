const httpStatus = require('http-status')
const { userService } = require('../service')
const { catchAsync } = require('../helper')

const getCurrentUserProfileHandler = catchAsync(async (req, res) => {
  const { id } = req.user
  const userProfile = await userService.getMyProfile(id)
  res.status(200).json(userProfile)
})

const fetchInfoFromSlack = catchAsync(async (req, res) => {
  const { email } = req.body
  const slackProfile = await userService.fetchInfoFromSlack(email)
  res.status(httpStatus.OK).json({ slackProfile })
})

const updateMyProfile = catchAsync(async (req, res) => {
  const { id } = req.user
  const userProfile = await userService.updateMyProfile(id, req.body)
  res.status(httpStatus.OK).json(userProfile)
})

module.exports = {
  getCurrentUserProfileHandler,
  fetchInfoFromSlack,
  updateMyProfile
}
