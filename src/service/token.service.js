const jwt = require('jsonwebtoken')
const moment = require('moment')

const { jwtSecretKey, jwtRefreshTokenExpiredIn } = require('../config/auth')
const { tokenTypes } = require('../config/tokens')
const { Token } = require('../model')
const generateToken = (userId, expires, type, secret = jwtSecretKey) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  }

  return jwt.sign(payload, secret)
}

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    userId,
    expires: new Date(expires),
    type,
    blacklisted
  })
  return tokenDoc
}

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, jwtSecretKey)
  const tokenDoc = await Token.findOne({ where: { token, type, userId: payload.sub, blacklisted: false } })
  if (!tokenDoc) {
    throw new Error('Token not found')
  }
  return tokenDoc
}

const generateAuthToken = async (user) => {
  const accessTokenExpires = moment().add(jwtRefreshTokenExpiredIn, 'minutes')
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS)

  const refreshTokenExpires = moment().add(jwtRefreshTokenExpiredIn, 'day')
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH)
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH)

  return {
    accessToken,
    refreshToken
  }
}

module.exports = {
  generateToken,
  generateAuthToken,
  saveToken,
  verifyToken
}
