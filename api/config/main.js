module.exports = {
  port: process.env.PORT || 5000,
  database: process.env.DATABASE || 'mongodb://mongo/portefolio',
  secret: process.env.SECRET || 'secrettoken',
  registrationSecret: process.env.REGISTRATIONSECRET || 'secrettoken'
}
