const jwt = require('jsonwebtoken')
const secret = 'Jimmy is cool '
const User = require('../models/user')

function secureRoute(req, res, next) {

  const rawToken = req.headers.authorization

  if (!rawToken) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  const token = rawToken.replace('Bearer ', '')

  jwt.verify(token, secret, (err, tokenBody) => {

    if (err) return res.status(401).send({ message: 'Unauthorized' })

    const userId = tokenBody.sub
    User
      .findById(userId)
      .then(user => {
        if (!user) return res.status(401).send({ message: 'Unauthorized' })

        req.currentUser = user

        next()
      })
      .catch(() => res.status(401).send({ message: 'Unauthorized' }))
  })
}

module.exports = secureRoute