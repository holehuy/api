const Joi = require('joi')
const { whiteListEmailDomain } = require('../config/auth')

const getEmployees = {
  query: Joi.object().keys({
    page: Joi.number().integer().default(1),
    limit: Joi.number().integer().default(12),
    filterType: Joi.number().integer(),
    textSearch: Joi.string()
  })
}

const getEmployeePersonalInfo = {
  params: Joi.object().keys({
    employeeId: Joi.number().integer()
  })
}

const deleteEmployee = {
  params: Joi.object().keys({
    employeeId: Joi.number().integer()
  })
}
const emailRegExpStr = `${whiteListEmailDomain.join('|')}$`
const emailRegExp = new RegExp(emailRegExpStr)
const updateEmployee = {
  params: Joi.object().keys({
    employeeId: Joi.number().integer()
  }),
  body: Joi.object().keys({
    fullName: Joi.string().max(255),
    position: Joi.string().max(255),
    phoneNumber: Joi.string().min(10).max(11),
    email: Joi.string().email().max(255).regex(emailRegExp),
    address: Joi.string().max(255),
    avatar: Joi.string().uri()
  }).min(1)
}

const createEmployee = {
  body: Joi.object().keys({
    fullName: Joi.string().max(255).required(),
    position: Joi.string().max(255).required(),
    phoneNumber: Joi.string().min(10).max(11).required(),
    email: Joi.string().email().max(255).regex(emailRegExp).required(),
    address: Joi.string().max(255).required(),
    avatar: Joi.string().uri().required()
  })
}

module.exports = {
  getEmployees,
  deleteEmployee,
  getEmployeePersonalInfo,
  updateEmployee,
  createEmployee
}
