const Joi = require('joi')

const { whiteListEmailDomain } = require('../config/auth')
const emailRegExpStr = `${whiteListEmailDomain.join('|')}$`
const emailRegExp = new RegExp(emailRegExpStr)

const fetchInfoFromSlack = {
  body: Joi.object().keys({
    email: Joi.string().email().regex(emailRegExp).required()
  })
}

const updateMyProfile = {
  body: Joi.object().keys({
    fullName: Joi.string().max(255),
    position: Joi.string().max(255),
    phoneNumber: Joi.string().max(255),
    address: Joi.string().max(255),
    avatar: Joi.string().uri()
  })
}

module.exports = {
  fetchInfoFromSlack,
  updateMyProfile
}
