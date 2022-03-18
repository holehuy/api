const { MasterDataEmployee, ExaminationType, QuestionType } = require('../model')
const { LANGUAGE_CODE } = require('../constants')

const getMasterDataEmployee = async (languageCode) => {
  const data = await MasterDataEmployee.findAll({ where: { languageCode }, attributes: ['id', 'value'] })
  return data
}

const findMasterDataFilterEmployee = async (id) => {
  const masterDataFilter = await MasterDataEmployee.findOne({ where: { id: id } })
  return masterDataFilter
}

const getMasterDataExaminationType = async (languageCode) => {
  let query = { attributes: ['id', ['enValue', 'value']] }
  if (languageCode === LANGUAGE_CODE.JA) {
    query = { attributes: ['id', ['jaValue', 'value']] }
  }
  const data = await ExaminationType.findAll(query)
  return data
}

const getMasterDataQuestionType = async (languageCode) => {
  let query = { attributes: ['id', ['enValue', 'value']] }
  if (languageCode === LANGUAGE_CODE.JA) {
    query = { attributes: ['id', ['jaValue', 'value']] }
  }
  const data = await QuestionType.findAll(query)
  return data
}

module.exports = {
  getMasterDataEmployee,
  findMasterDataFilterEmployee,
  getMasterDataExaminationType,
  getMasterDataQuestionType
}
