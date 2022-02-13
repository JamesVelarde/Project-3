const Reviews = require('../models/reviews')

function index(req, res) {
  Reviews
    .find()
    .then(reviews => {
      res.send(reviews)
    })
}


function create(req, res) {
  const review = req.body
  review.user = req.currentUser
  Reviews
    .create(review)
    .then(review => {
      res.status(201).send(review)

    })
    .catch(error => res.send(error))

}

function remove(req, res) {
  const reviewId = req.params.id
  Reviews
    .findById(reviewId)
    .then(review => {
      const currentUserId = req.currentUser._id
      const userIdOnReview = review.user
      if (!userIdOnReview.equals(currentUserId)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      review.deleteOne()
      res.status(202).send(review)
    })
}

function update(req, res) {
  const reviewUpdate = req.body
  const id = req.params.id
  Reviews
    .findById(id)
    .then(review => {
      const currentUserId = req.currentUser._id
      const userIdOnReview = review.user
      if (!userIdOnReview.equals(currentUserId)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      review.set(reviewUpdate)
      review.save()
      res.status(202).send(review)
    })
}


// ! Comment controller logic

function createComment(req, res) {
  const comment = req.body
  req.body.user = req.currentUser
  Reviews
    .findById(req.params.id)
    .populate('comments.user')
    .then(review => {
      if (!review) return res.status(404).send({ message: 'Not found' })

      review.comments.push(comment)
      return review.save()
    })
    .then(review => res.send(review))
    .catch(err => res.send(err))
}



function updateComment(req, res) {
  Reviews
    .findById(req.params.id)
    .then(review => {
      if (!review) return res.status(404).send({ message: 'Not found' })
     
      const comment = review.comments.id(req.params.commentId)

   
      if (!comment.user.equals(req.currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }

    
      comment.set(req.body)
      return review.save()
    })
    .then(review => res.status(202).send(review))
    .catch(err => res.send(err))
}



function removeComment(req, res) {
  Reviews
    .findById(req.params.id)
    .then(review => {
      if (!review) return res.status(404).send({ message: 'Not found' })
     
      const comment = review.comments.id(req.params.commentId)

    
      if (!comment.user.equals(req.currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }

      
      comment.remove()
      return review.save()
    })
    .then(review => res.status(202).send(review))
    .catch(err => res.send(err))
}

module.exports = {
  index,
  create,
  remove,
  update,
  createComment,
  removeComment,
  updateComment
}