const httpStatus = require('http-status')
const { tokenTypes } = require('../config/tokens')
const { ApiError } = require('../helper')
const { Token, User } = require('../model')

const loginUserWithGoogle = async (email) => {
  const user = await User.findOne({ where: { email: email } })
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
  }
  return user
}
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ where: { token: refreshToken, type: tokenTypes.REFRESH } })
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_MODIFIED, 'Not found')
  }
  await Token.destroy({ where: { token: refreshToken, type: tokenTypes.REFRESH } })
}

module.exports = {
  loginUserWithGoogle,
  logout
}
