const { User } = require('../models')

module.exports = {
  async signUp (ctx) {
    try {
      const user = await User.create(ctx.request.body)
      console.log('\n\n', user.toJSON(), '\n\n')
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
        where: {
          username: ctx.request.body.username,
          password: ctx.request.body.password
        }
      })
      console.log(ctx.body = [
        user.toJSON(),
        ctx.request.body
      ])
    } catch (error) {
      ctx.throw(400, 'username or password is incorrect')
    }
  }
  // async logIn (ctx) {
  //   try {
  //     const user = await User.findOne({
  //       where: { username: ctx.params.id }
  //     })
  //     console.log('\n\nuser:', user)
  //     ctx.body = user.toJSON()
  //   } catch (error) {
  //     // ctx.status = error.status || error.statusCode || 500
  //     ctx.body = 'No user found with this username'
  //   }
  // }
}
