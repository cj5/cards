module.exports = {
  port: process.env.PORT || 5000,
  db: {
    database: process.env.DB_NAME || 'cards',
    user: process.env.DB_USER || 'chrisstack',
    password: process.env.DB_PASS || '',
    options: {
      host: process.env.HOST || 'localhost',
      dialect: process.env.DIALECT || 'postgres'
    }
  }
}
