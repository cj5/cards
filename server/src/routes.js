const Router = require('koa-router')
const router = new Router()

const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')

router.post('/api/sign-up', async ctx => {
  await AuthControllerPolicy.signUp(ctx, AuthController.signUp)
})

router.get('/api/user/:id', async ctx => {
  await AuthController.logIn(ctx)
})

module.exports = router
