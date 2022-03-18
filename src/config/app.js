const yenv = require('yenv')

const { app } = yenv()

module.exports = {
  host: app.host ?? 'localhost',
  port: app.port ?? 3000
}
