const httpStatus = require('http-status')

const { pick, catchAsync } = require('../helper')
const { examinationService } = require('../service')

const getListExaminations = catchAsync(async (req, res) => {
  const queryOptions = pick(req.query, ['page', 'limit', 'type', 'textSearch', 'duration', 'date', 'lang'])
  const result = await examinationService.queryExaminations(queryOptions)
  res.status(httpStatus.OK).json({ ...result })
})

const getExamination = async (req, res) => {
  const { examinationId } = req.params
  const { lang } = req.query
  const { role } = req.user
  const examination = await examinationService.findExaminationById(examinationId, lang, role)
  return res.status(httpStatus.OK).json({ examination })
}
module.exports = {
  getListExaminations,
  getExamination
}
