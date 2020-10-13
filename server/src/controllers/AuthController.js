const { User } = require('../models')
const bcrypt = require('bcrypt')

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
    try {
      const username = ctx.request.body.username
      const password = ctx.request.body.password

      const user = await User.findOne({
        where: { username: username }
      })

      const valid = await bcrypt.compare(password, user.password)

      if (valid) {
        ctx.body = { username: user.username }
      } else {
        ctx.throw(400)
      }
    } catch (error) {
      ctx.throw(400, 'Invalid username or password')
    }
  }
}
