const Sequelize = require('sequelize')

const { Examination, ExaminationType, Question, Choice, QuestionType } = require('../model')
const { LANGUAGE_CODE } = require('../constants')

const { Op } = Sequelize
const queryExaminations = async (queryOptions) => {
  const { page, limit, textSearch, duration, date, type, lang } = queryOptions
  const offset = (page - 1) * limit
  const query = {
    where: { deletedAt: { [Op.eq]: null } },
    offset,
    limit,
    include: [{ model: ExaminationType, as: 'examinationType', attributes: ['id', ['enValue', 'value']] }],
    attributes: ['id', 'examName', 'duration', 'startDate', 'endDate', 'passed', 'randomize', 'numberOfQuestion', 'enrolled', 'status', 'image'],
    order: [['createdAt', 'DESC']]
  }
  if (textSearch) {
    query.where.examName = { [Op.like]: `%${textSearch.trim()}%` }
  }
  if (duration) {
    query.where.duration = duration
  }
  if (date) {
    const from = new Date(date)
    const end = new Date(date)
    end.setDate(end.getDate() + 1)
    query.where.startDate = { [Op.gte]: from, [Op.lt]: end }
  }
  if (lang === LANGUAGE_CODE.JA) {
    query.include = [{ model: ExaminationType, as: 'examinationType', attributes: ['id', ['jaValue', 'value']] }]
  }
  if (type) {
    query.where.examinationTypeId = type
  }
  const { count: total, rows: data } = await Examination.findAndCountAll(query)
  const lastPage = Math.ceil(total / limit)
  return {
    data,
    pagination: {
      total,
      lastPage,
      currentPage: page,
      perPage: data.length
    }
  }
}

const findExaminationById = async (examinationId, lang, role) => {
  const languageContentField = lang === LANGUAGE_CODE.EN ? 'enValue' : 'jaValue'
  const query = {
    where: { id: examinationId },
    include: [{
      model: ExaminationType,
      as: 'examinationType',
      attributes: ['id', ['enValue', 'value']]
    }, {
      model: Question,
      as: 'questions',
      attributes: ['id', 'title', 'examinationId'],
      include: [{
        model: Choice,
        as: 'choices',
        attributes: role === 'admin' ? ['id', 'questionId', 'text', 'isRight'] : ['id', 'questionId', 'text']
      }, {
        model: QuestionType,
        as: 'questionType',
        attributes: ['id', [languageContentField, 'value']]
      }]
    }],
    attributes: ['id', 'examName', 'duration', 'startDate', 'endDate', 'passed', 'randomize', 'numberOfQuestion', 'enrolled', 'status', 'image']
  }
  const examination = await Examination.findOne(query)
  return examination
}

module.exports = {
  queryExaminations,
  findExaminationById
}
