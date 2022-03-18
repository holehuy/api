const allRoles = {
  employee: ['getProfile', 'getListExaminations', 'getExamination'],
  admin: ['getEmployees', 'manageEmployees', 'getMasterData', 'getProfile', 'uploadAvatar', 'viewOtherEmployeeDetail', 'getListExaminations', 'getExamination']
}

const roles = Object.keys(allRoles)
const roleRights = new Map(Object.entries(allRoles))

module.exports = {
  roles, roleRights
}
