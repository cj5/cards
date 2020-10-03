const koaJoi = require('koa-joi-router')
const Joi = koaJoi.Joi

const pwMinLength = 10
const pattern = `(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{${pwMinLength},}`

module.exports = {
  signUp (ctx, next) {
    const schema = {
      username: Joi.string(),
      password: Joi.string().regex(new RegExp(pattern)),
      email: Joi.string().email(),
      created_on: Joi.date(),
      last_login: Joi.date()
    }

    const { error } = Joi.validate(ctx.request.body, schema)

    if (error) {
      console.log(error.details[0])
      switch (error.details[0].context.key) {
        case 'username':
          ctx.throw(400, 'Invalid username')
          break
        case 'password':
          ctx.throw(400, `The password provided failed to match the following&nbsp;rules: <br>1. Must be at least ${pwMinLength} characters in length <br>2. Must contain at least 1 letter <br>3. Must include at least 1 number <br>4. Allowed and recommended to include symbols (!@#$%^&*)`)
          break
        case 'email':
          ctx.throw(400, 'You must provide a valid email address')
          break
        case 'created_on':
          ctx.throw(400, 'Error with created_on string')
          break
        case 'last_login':
          ctx.throw(400, 'Error with last_login string')
          break
        default:
          ctx.throw(400, 'Invalid sign up information')
      }
    } else {
      console.log('WHAT IS UP!?')
      next()
    }
  }
}
