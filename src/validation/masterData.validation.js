const Joi = require('joi')
const { LANGUAGE_CODE } = require('../constants')

const getMasterDataFilterEmployee = {
  query: Joi.object().keys({
    lang: Joi.string().default(LANGUAGE_CODE.EN).valid(LANGUAGE_CODE.EN, LANGUAGE_CODE.JA)
  })
}

const getMasterDataExaminationType = {
  query: Joi.object().keys({
    lang: Joi.string().default(LANGUAGE_CODE.EN).valid(LANGUAGE_CODE.EN, LANGUAGE_CODE.JA)
  })
}

const getMasterDataQuestionType = {
  query: Joi.object().keys({
    lang: Joi.string().default(LANGUAGE_CODE.EN).valid(LANGUAGE_CODE.EN, LANGUAGE_CODE.JA)
  })
}

module.exports = { getMasterDataFilterEmployee, getMasterDataExaminationType, getMasterDataQuestionType }
