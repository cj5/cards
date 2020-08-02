const Sequelize = require('sequelize')
const sequelize = new Sequelize('cards', 'chrisstack', 'pw', {
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = sequelize