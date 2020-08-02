const Router = require('koa-router')
const router = new Router()
const User = require('../models/User')

router.get('/api/users', async ctx => {
  await User.findAll()
  .then(users => {
    ctx.body = users
  })
  .catch(err => {
    ctx.body = err
  })
})

router.post('/api/user', async ctx => {
  if (!ctx.request.body.username) {
    ctx.body = { error: 'Bad data' }
  } else {
    await User.create(ctx.request.body)
      .then(data => {
        ctx.body = data
      })
      .catch(err => {
        ctx.body = err
      })
  }
})

module.exports = router