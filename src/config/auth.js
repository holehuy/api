const yenv = require('yenv')

const { app } = yenv()

module.exports = {
  jwtSecretKey: app?.authentication?.jwtSecretKey || 'jwtSecretKey',
  jwtAcessTokenExpiredIn: app.authentication.jwtAcessTokenExpiredIn || 3600,
  jwtRefreshTokenExpiredIn: app.authentication.jwtRefreshTokenExpiredIn || 15778463,
  corsWhiteURL: app.authentication.corsWhiteURL || 'http://localhost:3000',
  whiteListEmailDomain: app?.whiteListEmailDomain.split(',')
}
