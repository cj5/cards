const { User } = require('../models')

module.exports = {
  async signUp (ctx) {
    try {
      const user = await User.create(ctx.request.body)
      ctx.body = user.toJSON()
    } catch (err) {
      ctx.throw(400, 'This email account is already in use.')
    }
  }
}
