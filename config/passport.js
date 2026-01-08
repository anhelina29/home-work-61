const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const { users } = require('../api/users/users.ctrl')

module.exports = (passport) => {
    try {
        passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            const user = users.find(user => user.email.toString() === email.toString())

            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (!user || !isPasswordValid) {
                return done(null, false)
            }

            return done(null, user)
        }))

        passport.serializeUser((user, done) => {
            done(null, user.email)
        })

        passport.deserializeUser((email, done) => {
            const user = users.find(user => user.email.toString() === email.toString())
            done(null, user)
        })
    } catch (err) {
        return done(err)
    }
}