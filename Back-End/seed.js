const mongoose = require('mongoose')
const User = require('./models/user')

mongoose.connect(
  'mongodb://localhost/coffeedb',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err)

    console.log('Mongoose connected!')
    db.dropDatabase()
      .then(() => {
        return User.create([
          {
            username: 'jimmy3302',
            email: 'jimmyvelarde3302@gmail.com',
            password: 'hi',
            passwordConfirmation: 'hi'
          },
        ])
      })
      .then(users => {
        console.log(`${users.length}users have been created !`)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        mongoose.connection.close()
      })
  }
)