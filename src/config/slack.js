const yenv = require('yenv')

const { services } = yenv()

module.exports = {
  botUserOAuthTokenRS: services?.slack?.botUserOAuthTokenRS || '',
  botUserOAuthTokenEST: services?.slack?.botUserOAuthTokenEST || ''
}
