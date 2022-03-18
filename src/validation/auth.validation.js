const Joi = require('joi')

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
}

module.exports = {
  logout
}
