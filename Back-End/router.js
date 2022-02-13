const router = require('express').Router()
const reviewsController = require('./controllers/reviewsController')
const userController = require('./controllers/userController')
const secureRoute = require('./lib/secureRoute')

router.route('/reviews')
  .get(reviewsController.index)
  .post(secureRoute, reviewsController.create)

router.route('/review/:id')

  .delete(secureRoute, reviewsController.remove)
  .put(secureRoute, reviewsController.update)

router.route('/review/:id/comments')
  .post(secureRoute, reviewsController.createComment)

router.route('/review/:id/comment/:commentId')
  .delete(secureRoute, reviewsController.removeComment)
  .put(secureRoute, reviewsController.updateComment)

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

module.exports = router