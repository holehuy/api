const httpStatus = require('http-status')
const Slack = require('slack')

const { ApiError } = require('../helper')
const { User } = require('../model')
const { botUserOAuthTokenRS, botUserOAuthTokenEST } = require('../config/slack')
const { whiteListEmailDomain } = require('../config/auth')

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email: email } })
  return user
}

const getMyProfile = async (userId) => {
  const userProfile = await User.findOne({ where: { id: userId }, attributes: ['fullName', 'email', 'role', 'avatar', 'position', 'address', 'phoneNumber'] })
  if (!userProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  return userProfile
}

const updateMyProfile = async (userId, updateBody) => {
  await User.update({ ...updateBody }, { where: { id: userId } })
  const userProfile = await User.findOne({ where: { id: userId }, attributes: ['fullName', 'email', 'role', 'avatar', 'position', 'address', 'phoneNumber'] })
  if (!userProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  return userProfile
}

const fetchInfoFromSlack = async (email) => {
  let token
  if (email.includes(whiteListEmailDomain[0])) {
    token = botUserOAuthTokenRS
  } else {
    token = botUserOAuthTokenEST
  }
  const bot = new Slack({ token })
  const data = await bot.users.lookupByEmail({ email })
  if (!data.ok) {
    throw new ApiError(404, 'User does not exist on Rising Stars or EST Rouge workspace')
  }
  const { phone: phoneNumber, title: position, real_name: fullName, image_1024: avatar } = data.user.profile
  const slackProfile = { phoneNumber, position, fullName, avatar, email }
  return slackProfile
}

module.exports = {
  findUserByEmail,
  getMyProfile,
  fetchInfoFromSlack,
  updateMyProfile
}
