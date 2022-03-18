const Sequelize = require('sequelize')
const winston = require('winston')

function MySqlConnector (name, dbConfig) {
  if (dbConfig.type !== 'mysql') {
    throw Error(`DbConfig of ${name} should have type 'mysql'`)
  }
  this.name = name
  this.dbConfig = dbConfig
  this.sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      define: {
        charset: 'utf8mb4',
        collate: 'utf8_general_ci'
      },
      timezone: dbConfig.timezone
    }
  )
}

MySqlConnector.prototype.init = async function init () {
  await this.sequelize.authenticate()
  winston.info(`Connection to ${this.name} has been established successfully.`)
}

MySqlConnector.prototype.disconnect = function disconnect (callback) {
  this.sequelize.close()
  callback(null)
}

module.exports = MySqlConnector
