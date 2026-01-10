const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const UserModel = require('../models/users')

module.exports = (passport) => {
    try {
        passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            const user = await UserModel.findOne({ email: email })

            if (!user) {
                return done(null, false)
            }

            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (!isPasswordValid) {
                return done(null, false)
            }

            return done(null, user)
        }))

        passport.serializeUser((user, done) => {
            done(null, user.id)
        })

        passport.deserializeUser(async (id, done) => {
            const user = await UserModel.findById(id)
            done(null, user)
        })
    } catch (err) {
        return done(err)
    }
}