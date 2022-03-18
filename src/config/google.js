const yenv = require('yenv')

const { services } = yenv()

module.exports = {
  aaa: services?.google?.aaa,
  clientSecret: services?.google?.clientSecret,
  clientId: services?.google?.clientId,
  callbackURL: services?.google?.callbackURL,
  successRedirect: services?.google?.successRedirect,
  failureRedirect: services?.google?.failureRedirect
}
