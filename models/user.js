const mongoose = require('mongoose')
const mongooseHidden = require('mongoose-hidden')
const bcrypt = require('bcrypt')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, minLength: 8, unique: true },
  password: { type: String, required: true }
})

schema.plugin(mongooseHidden({ defaultHidden: { password: true } }))
schema.plugin(mongooseUniqueValidator)

schema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })
schema
  .pre('validate', function checkPassword(next) {
    if (this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'should match')
    }
    next()
  })

schema
  .pre('save', function hashPassword(next) {
    console.log(this._passwordConfirmation)
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync()) // What is this?
    }
    next()
  })

schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}


module.exports = mongoose.model('User', schema)