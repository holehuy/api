const httpStatus = require('http-status')

const { masterDataService } = require('../service')
const { catchAsync, pick } = require('../helper')

const getMasterDataFilterEmployee = catchAsync(async (req, res) => {
  const { lang } = pick(req.query, ['lang'])
  const data = await masterDataService.getMasterDataEmployee(lang)
  res.status(httpStatus.OK).json({ ...data })
})

const getMasterDataExaminationType = catchAsync(async (req, res) => {
  const { lang } = pick(req.query, ['lang'])
  const data = await masterDataService.getMasterDataExaminationType(lang)
  res.status(httpStatus.OK).json({ ...data })
})

const getMasterDataQuestionType = catchAsync(async (req, res) => {
  const { lang } = pick(req.query, ['lang'])
  const data = await masterDataService.getMasterDataQuestionType(lang)
  res.status(httpStatus.OK).json({ ...data })
})

module.exports = {
  getMasterDataFilterEmployee,
  getMasterDataExaminationType,
  getMasterDataQuestionType
}
