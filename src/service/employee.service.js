const httpStatus = require('http-status')
const Sequelize = require('sequelize')

const { User, MasterDataEmployee } = require('../model')
const { ApiError, commonHelper } = require('../helper')
const { generateNewEmail, getEmailPrefix } = require('../helper/common')

const { Op } = Sequelize

const queryEmployees = async (queryOptions) => {
  const { page, limit, filterType, textSearch } = queryOptions
  const offset = (page - 1) * limit
  let sortBy = 'DESC'
  let query
  if (filterType) {
    const masterDataFilterEmployeeDoc = await MasterDataEmployee.findOne({ where: { id: filterType } })
    if (!masterDataFilterEmployeeDoc) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unexpected filter type')
    }
    if (masterDataFilterEmployeeDoc.translationId === 1) { sortBy = 'DESC' } else { sortBy = 'ASC' }
  }
  const order = [['createdAt', sortBy]]
  if (!textSearch) {
    query = { where: { role: 'employee', deletedAt: { [Op.eq]: null } }, offset, limit, attributes: ['id', 'fullName', 'avatar', 'position', 'address', 'phoneNumber', 'email'], order: order }
  } else {
    query = { where: { role: 'employee', deletedAt: { [Op.eq]: null }, fullName: { [Op.like]: `%${commonHelper.stringEscape(textSearch.trim())}%` } }, offset, limit, attributes: ['id', 'fullName', 'avatar', 'position', 'address', 'phoneNumber', 'email'], order: order }
  }
  const { count: total, rows: data } = await User.findAndCountAll(query)
  const lastPage = Math.ceil(total / limit)
  return {
    data,
    pagination: {
      total,
      lastPage,
      currentPage: page,
      perPage: data.length
    }
  }
}

const deleteEmployeeById = async (employeeId) => {
  const employee = await User.findOne({ where: { id: employeeId }, attributes: ['id', 'fullName', 'avatar', 'position', 'address', 'phoneNumber', 'email'] })
  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found')
  }
  await User.update({ deletedAt: new Date() }, { where: { id: employee.id, role: 'employee' } })
  return employee
}

const getEmployeeInfoById = async (employeeId) => {
  const employee = await User.findOne({ where: { id: employeeId, role: 'employee', deletedAt: { [Op.eq]: null } }, attributes: ['id', 'fullName', 'avatar', 'position', 'address', 'phoneNumber', 'email'] })
  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found')
  }
  return employee
}

const updateEmployeeById = async (employeeId, updateBody) => {
  const { email, phoneNumber } = updateBody
  const employeeToUpdate = await await User.findOne({ where: { id: employeeId, deletedAt: { [Op.eq]: null } }, attributes: ['id', 'fullName', 'avatar', 'position', 'address', 'phoneNumber', 'email'] })
  if (employeeToUpdate.email === email && employeeToUpdate.phoneNumber === phoneNumber) {
    await User.update({ ...updateBody }, { where: { id: employeeId } })
  } else {
    const emailAndPhoneExist = await User.findOne({ where: { email, phoneNumber, deletedAt: { [Op.eq]: null } } })
    const emailExist = await User.findOne({ where: { email, deletedAt: { [Op.eq]: null } } })
    const phoneExits = await User.findOne({ where: { phoneNumber, deletedAt: { [Op.eq]: null } } })
    if (employeeToUpdate.email !== email && employeeToUpdate.phoneNumber !== phoneNumber) {
      if (emailAndPhoneExist) {
        throw new ApiError(httpStatus.CONFLICT, 'Email and phone number is already exits', true, '', [{ field: 'phoneNumber' }, { field: 'email' }])
      }
      if (emailExist && phoneExits) {
        throw new ApiError(httpStatus.CONFLICT, 'Email and phone number is already exits', true, '', [{ field: 'phoneNumber' }, { field: 'email' }])
      }
      if (emailExist) {
        throw new ApiError(httpStatus.CONFLICT, 'Email is already exits', true, '', [{ field: 'email' }])
      }
      if (phoneExits) {
        throw new ApiError(httpStatus.CONFLICT, 'Phone number is already exits', true, '', [{ field: 'phoneNumber' }])
      }
    }
    if (employeeToUpdate.email === email) {
      if (phoneExits) {
        throw new ApiError(httpStatus.CONFLICT, 'Phone number is already exits', true, '', [{ field: 'phoneNumber' }])
      }
    }
    if (employeeToUpdate.phoneNumber === phoneNumber) {
      if (emailExist) {
        throw new ApiError(httpStatus.CONFLICT, 'Email is already exits', true, '', [{ field: 'email' }])
      }
    }
    await User.update({ ...updateBody }, { where: { id: employeeId } })
  }
  const employee = await User.findOne({ where: { id: employeeId }, attributes: ['id', 'fullName', 'avatar', 'position', 'address', 'phoneNumber', 'email'] })
  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found')
  }
  return employee
}

const createEmployee = async (employeeInfo) => {
  const { email, phoneNumber } = employeeInfo
  const emailAndPhoneExist = await User.findOne({ where: { email, phoneNumber, deletedAt: { [Op.eq]: null } } })
  if (emailAndPhoneExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Email and phone number is already exits', true, '', [{ field: 'phoneNumber' }, { field: 'email' }])
  }
  const emailExist = await User.findOne({ where: { email, deletedAt: { [Op.eq]: null } } })
  const phoneExits = await User.findOne({ where: { phoneNumber, deletedAt: { [Op.eq]: null } } })
  if (emailExist && phoneExits) {
    throw new ApiError(httpStatus.CONFLICT, 'Email and phone number is already exits', true, '', [{ field: 'phoneNumber' }, { field: 'email' }])
  }
  if (emailExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Email is already exits', true, '', [{ field: 'email' }])
  }
  if (phoneExits) {
    throw new ApiError(httpStatus.CONFLICT, 'Phone number is already exits', true, '', [{ field: 'phoneNumber' }])
  }
  const emailDeletedExist = await User.findOne({ where: { email, deletedAt: { [Op.ne]: null } } })
  if (emailDeletedExist) {
    const { count } = await User.findAndCountAll({ where: { email: { [Op.like]: `%${getEmailPrefix(email)}%` } } })
    const newEmail = generateNewEmail(email, count)
    const employeeDoc = await User.create({ ...employeeInfo, email: newEmail, role: 'employee' })
    return employeeDoc
  }
  const employeeDoc = await User.create({ ...employeeInfo, role: 'employee' })
  return employeeDoc
}

module.exports = {
  queryEmployees,
  deleteEmployeeById,
  getEmployeeInfoById,
  updateEmployeeById,
  createEmployee
}
