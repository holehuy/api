const express = require('express')

const { auth } = require('../middleware/auth.middleware')
const { validate } = require('../middleware')
const { examinationValidation } = require('../validation')
const { examinationController } = require('../controller')
const router = express.Router()

router.get('/', auth('getListExaminations'), validate(examinationValidation.getListExaminations), examinationController.getListExaminations)

router.route('/:examinationId')
  .get(auth('getExamination'), validate(examinationValidation.getExamination), examinationController.getExamination)

module.exports = router
