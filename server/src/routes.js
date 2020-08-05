const Router = require('koa-router')
const router = new Router()

const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

router.post('/api/sign-up',
  AuthenticationControllerPolicy.signUp,
  AuthenticationController.signUp
)

module.exports = router
