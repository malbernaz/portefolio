module.exports = {
  port: process.env.PORT || 5000,
  database: process.env.DATABASE || 'mongodb://127.0.1:27017/portefolio',
  secret: process.env.SECRET || 'secrettoken',
  registrationSecret: process.env.REGISTRATIONSECRET || 'secrettoken'
}
