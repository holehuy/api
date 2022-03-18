const httpStatus = require('http-status')
const util = require('util')
const fs = require('fs')

const unlinkFile = util.promisify(fs.unlink)

const { catchAsync, pick } = require('../helper')
const { mediaService } = require('../service')

const uploadAvatar = catchAsync(async (req, res) => {
  const { file } = req
  const result = await mediaService.uploadFile(file)
  await unlinkFile(file.path)
  res.status(httpStatus.OK).json({ avatar: result.Location })
})

const textSummary = catchAsync(async (req, res) => {
  const query = pick(req, ['text', 'type', 'sentences'])
  const result = await mediaService.textSummary(query)
  res.status(httpStatus.OK).json({ ...result })
})

const textExtractiveSummary = catchAsync(async (req, res) => {
  const query = pick(req.body, ['text', 'sentences'])
  const result = await mediaService.textExtractiveSummary(query)
  res.status(httpStatus.OK).json({ ...result })
})

const textAbstractiveSummary = catchAsync(async (req, res) => {
  console.log('huyhuy')
  const query = pick(req.body, ['text', 'min_length', 'max_length'])
  const result = await mediaService.textAbstractiveSummary(query)
  res.status(httpStatus.OK).json({ ...result })
})

const uploadPdf = catchAsync(async (req, res) => {
  const { file } = req
  const query = req.query
  const result = await mediaService.uploadFdf(file, query)
  await unlinkFile(file.path)
  res.status(httpStatus.OK).json({ ...result })
})

module.exports = {
  uploadAvatar,
  uploadPdf,
  textSummary,
  textExtractiveSummary,
  textAbstractiveSummary
}
