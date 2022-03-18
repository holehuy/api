const { main: mainDbConfig } = require('../config/database')
const MySqlConnector = require('../core/database/mysq.connector')

const mysql = new MySqlConnector('main', mainDbConfig)

const mainDB = module.exports

mainDB.init = () => mysql.init()

mainDB.disconnect = () => mysql.disconnect()

mainDB.sequelize = mysql.sequelize
