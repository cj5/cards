const { User } = require('../models')

module.exports = {
  async signUp (ctx) {
    try {
      const user = await User.create(ctx.request.body)
      console.log('user:', user)
      ctx.body = user.toJSON()
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
      const user = await User.findOne({
        where: { username: ctx.params.id }
      })
      ctx.body = user.toJSON()
    } catch (error) {
      ctx.status = error.status || error.statusCode || 500
      ctx.body = 'Error finding user. (AuthController.js)'
    }
  }
}
