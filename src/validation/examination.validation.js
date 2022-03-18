const Joi = require('joi')
const { LANGUAGE_CODE } = require('../constants')

const getListExaminations = {
  query: Joi.object().keys({
    type: Joi.number().integer(),
    page: Joi.number().integer().default(1),
    limit: Joi.number().integer().default(12),
    textSearch: Joi.string().max(50),
    date: Joi.date(),
    duration: Joi.number().integer().valid(30, 45, 60, 90, 120),
    lang: Joi.string().default(LANGUAGE_CODE.EN).valid(LANGUAGE_CODE.EN, LANGUAGE_CODE.JA)
  })
}

const getExamination = {
  params: Joi.object().keys({
    examinationId: Joi.number().integer()
  }),
  query: Joi.object().keys({
    lang: Joi.string().default(LANGUAGE_CODE.EN).valid(LANGUAGE_CODE.EN, LANGUAGE_CODE.JA)
  })
}

const textSummary = {
  body: Joi.object().keys({
    text: Joi.string().required(),
    type: Joi.string().default('extractive').valid('abstractive', 'extractive'),
    sentences: Joi.number().integer().default(5)
  })
}

module.exports = {
  getListExaminations,
  getExamination,
  textSummary
}
