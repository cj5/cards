const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  async signUp (ctx) {
    try {
      const password = ctx.request.body.password
      const hashedPassword = await bcrypt.hash(password, 12)
      ctx.request.body.password = hashedPassword
      await User.create(ctx.request.body)
      ctx.status = 200
    } catch (error) {
      ctx.status = error.status || error.statusCode || 500
      switch (error.errors[0].message) {
        case 'username must be unique':
          ctx.body = 'Username already taken'
          break
        case 'email must be unique':
          ctx.body = 'Email already in use'
          break
        default:
          ctx.body = 'Error in AuthController.js'
      }
    }
  },
  async logIn (ctx) {
    let errorMsg = ''
    try {
      const username = ctx.request.body.username
      const password = ctx.request.body.password

      const user = await User.findOne({
        where: { username: username }
      })

      if (!user) errorMsg = 'No user with that username'

      const validPassword = await bcrypt.compare(password, user.password)

      if (validPassword) {
        console.log('VALID password')
        ctx.body = { username: user.username }
        const accessToken = jwt.sign(
          { id: user.user_id },
          'SECRET',
          { expiresIn: '15m' }
        )
        ctx.cookies.set(
          'jid',
          jwt.sign({ id: user.user_id }, 'lasjhdf897asdf', {
            expiresIn: '7d'
          }),
          {
            httpOnly: true
          }
        )
        console.log('\n\naccessToken:', accessToken, '\n\n')
      } else {
        errorMsg = 'Password is incorrect'
        ctx.throw(400)
      }
    } catch (error) {
      ctx.throw(400, errorMsg)
    }
  }
}
