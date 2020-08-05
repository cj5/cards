const Koa = require('koa')
const app = new Koa()
const morgan = require('koa-morgan')
const bodyParser = require('koa-body')
const cors = require('@koa/cors')
const config = require('./config')

const router = require('./routes')

app.use(morgan('combined'))
app.use(bodyParser())
app.use(cors())

app.use(router.routes())

app.listen(config.port, () => console.log(`Server running at port ${config.port}`))
