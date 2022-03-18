const passportService = require('./passport.service')
const masterDataService = require('./masterData.service')
const userService = require('./user.service')
const authService = require('./auth.service')
const employeeService = require('./employee.service')
const tokenService = require('./token.service')
const mediaService = require('./media.services')
const examinationService = require('./examination.service')
module.exports = {
  passportService,
  masterDataService,
  userService,
  authService,
  employeeService,
  tokenService,
  mediaService,
  examinationService
}
