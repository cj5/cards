const allowNull = true

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull
    },
    password: {
      type: DataTypes.STRING,
      allowNull
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull
    },
    created_on: {
      type: DataTypes.STRING,
      allowNull
    },
    last_login: {
      type: DataTypes.STRING,
      allowNull
    }
  },
  {
    timestamps: false,
    freezeTableName: false
  })

  return User
}
