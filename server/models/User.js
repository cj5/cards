const Sequelize = require('sequelize')
const sequelize = require('../database/db')

module.exports = sequelize.define(
  'tbl_users',
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_on: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_login: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
)