const { authService, tokenService } = require('../service')
const httpStatus = require('http-status')

const { catchAsync } = require('../helper')

const loginWithGoogle = catchAsync(async (req, res) => {
  const { email } = req.user
  const user = await authService.loginUserWithGoogle(email)
  const token = await tokenService.generateAuthToken(user)
  res.status(httpStatus.OK).json({ ...token })
})

const logout = catchAsync(async (req, res) => {
  res.status(httpStatus.NO_CONTENT).json()
})

module.exports = {
  loginWithGoogle,
  logout
}
