const koaJoi = require('koa-joi-router')
const Joi = koaJoi.Joi

module.exports = {
  signUp (ctx, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^(?=.*[A-Za-z])(?=.*\d)[\w@$!%*#?&+-]{8,}$') // eslint-disable-line
      )
    }

    const { error } = Joi.validate(ctx.request.body, schema)

    console.log('Gettin here?')

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          ctx.throw(400, 'You must provide a valid email address')
          break
        case 'password':
          ctx.throw(400, 'The password provided failed to match the following rules: <br>1. It must be at least 8 characters — alphanumerics, plus: @$!%*#?&+- <br>2. It must contain at least 1 number')
          break
        default:
          ctx.throw(400, 'Invalid sign up information')
      }
    } else {
      next()
    }
  }
}

// ^[a-zA-Z0-9]{8,32}$
// ^[A-Za-z0-9_@./#&+-]{8,32}$
// ^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$

// require one number and allow special chars
// ^(?=.*[A-Za-z])(?=.*\d)[\w@$!%*#?&+-]{8,}$
