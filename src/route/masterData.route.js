const express = require('express')
const { masterDataController } = require('../controller')
const { auth } = require('../middleware/auth.middleware')
const { validate } = require('../middleware')
const { masterDataValidation } = require('../validation')
const router = express.Router()

router.get('/employee-types', auth('getMasterData'), validate(masterDataValidation.getMasterDataFilterEmployee), masterDataController.getMasterDataFilterEmployee)

router.get('/examination-types', auth('getMasterData'), validate(masterDataValidation.getMasterDataExaminationType), masterDataController.getMasterDataExaminationType)

router.get('/question-types', auth('getMasterData'), validate(masterDataValidation.getMasterDataQuestionType), masterDataController.getMasterDataQuestionType)

module.exports = router
