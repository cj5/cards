const Koa = require('koa')
const app = new Koa()
const morgan = require('koa-morgan')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
require('dotenv').config()
const config = require('./config')

const router = require('./routes')

app
  .use(cors({
    origin: 'http://localhost:8080',
    credentials: true
  }))
  .use(morgan('combined'))
  .use(bodyParser())
  .use(router.allowedMethods())
  .use(router.routes())

app.listen(config.port, () => {
  console.log(`Server running at PORT ${config.port}...`)
})
