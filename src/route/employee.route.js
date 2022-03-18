const express = require('express')
const { employeeController } = require('../controller')

const { validate } = require('../middleware')
const { auth } = require('../middleware/auth.middleware')
const { employeeValidation } = require('../validation')
const router = express.Router()

router.get('/', auth('getEmployees'), validate(employeeValidation.getEmployees), employeeController.getEmployees)

router.post('/', auth('manageEmployees'), validate(employeeValidation.createEmployee), employeeController.createEmployee)

router.route('/:employeeId')
  .delete(auth('manageEmployees'), validate(employeeValidation.deleteEmployee), employeeController.deleteEmployee)
  .get(auth('viewOtherEmployeeDetail'), validate(employeeValidation.getEmployeePersonalInfo), employeeController.getEmployeePersonalInfo)
  .patch(auth('manageEmployees'), validate(employeeValidation.updateEmployee), employeeController.updateEmployee)

module.exports = router
