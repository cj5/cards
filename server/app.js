const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-body')
const cors = require('@koa/cors')

const PORT = 5000
const users = require('./routes/users')

app.use(bodyParser())
app.use(cors())
app.use(users.routes())

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))