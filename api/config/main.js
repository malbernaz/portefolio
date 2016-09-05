const {
  PORT,
  NODE_ENV,
  TEST_DATABASE,
  DATABASE,
  SECRET,
  REGISTRATIONSECRET
} = process.env

module.exports = {
  port: PORT || 5000,
  database: NODE_ENV === 'test' ?
    TEST_DATABASE || 'mongodb://127.0.1:27017/portefolio_test' :
    DATABASE || 'mongodb://127.0.1:27017/portefolio',
  secret: SECRET || 'secrettoken',
  registrationSecret: REGISTRATIONSECRET || 'secrettoken'
}
