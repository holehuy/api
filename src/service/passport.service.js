const passport = require('passport')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')

const { User } = require('../model')
const { clientId, clientSecret, callbackURL } = require('../config/google')
// const { whiteListEmailDomain } = require('../config/auth')
passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: callbackURL,
      passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        avatar: `${profile.photos[0].value}`,
        googleId: profile.id,
        status: 'active',
        role: 'employee'
      }
      // if (!whiteListEmailDomain.includes(profile._json.hd)) {
      //   return cb(null, null)
      // }
      const user = await User.findOrCreate({
        where: { email: profile.emails[0].value },
        defaults: defaultUser
      }).catch((err) => {
        console.log('Error signing up', err)
        cb(err, null)
      })

      if (user && user[0]) return cb(null, user && user[0])
    }
  )
)

passport.serializeUser((user, cb) => {
  console.info('Serialize user:', user)
  cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ where: { id } }).catch((err) => {
    console.info('Error deserializing', err)
    cb(err, null)
  })

  console.info('DeSerialized user', user)

  if (user) { cb(null, user) } else { cb(null, null) }
})

module.exports = passport
