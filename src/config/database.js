const yenv = require('yenv')

const { databases, app } = yenv()

module.exports = {
  main: {
    type: 'mysql',
    database: databases?.mysql?.database ?? 'rs-es',
    dialect: databases?.mysql?.dialect ?? 'mysql',
    username: databases?.mysql?.username ?? 'root',
    password: databases?.mysql?.password.toString() ?? '',
    host: databases?.mysql?.host ?? 'mysql',
    port: databases?.mysql?.port ?? 3306,
    timezone: app?.timezone ?? 'Asia/Ho_Chi_Minh'
  }
}
