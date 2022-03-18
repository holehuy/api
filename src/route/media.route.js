const express = require('express')
const multer = require('multer')

const { auth } = require('../middleware/auth.middleware')
const { validate } = require('../middleware')
const { mediaController } = require('../controller')
const { examinationValidation } = require('../validation')

const upload = multer({ dest: 'upload/' })
const router = express.Router()

router.post('/avatar', auth('uploadAvatar'), upload.single('image'), mediaController.uploadAvatar)

router.post('/text-summary', validate(examinationValidation.textSummary), mediaController.textSummary)

router.post('/extractive/text', mediaController.textExtractiveSummary)

router.post('/abstractive/text', mediaController.textAbstractiveSummary)

router.post('/upload-pdf', upload.single('pdf-file'), mediaController.uploadPdf)

module.exports = router
