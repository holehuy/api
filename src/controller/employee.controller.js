const httpStatus = require('http-status')

const { employeeService } = require('../service')
const { pick, catchAsync } = require('../helper')

const getEmployees = catchAsync(async (req, res) => {
  const queryOptions = pick(req.query, ['page', 'limit', 'filterType', 'textSearch'])
  const result = await employeeService.queryEmployees(queryOptions)
  res.status(httpStatus.OK).json({ ...result })
})

const deleteEmployee = catchAsync(async (req, res) => {
  await employeeService.deleteEmployeeById(req.params.employeeId)
  res.status(httpStatus.NO_CONTENT).json()
})

const getEmployeePersonalInfo = catchAsync(async (req, res) => {
  const { employeeId } = req.params
  const employee = await employeeService.getEmployeeInfoById(employeeId)
  res.status(httpStatus.OK).json({ employee })
})

const updateEmployee = catchAsync(async (req, res) => {
  const employee = await employeeService.updateEmployeeById(req.params.employeeId, req.body)
  res.status(httpStatus.OK).json({ employee })
})

const createEmployee = catchAsync(async (req, res) => {
  const employeeInfo = req.body
  const employee = await employeeService.createEmployee(employeeInfo)
  res.status(httpStatus.OK).json({ employee })
})

module.exports = {
  getEmployees,
  deleteEmployee,
  getEmployeePersonalInfo,
  updateEmployee,
  createEmployee
}
