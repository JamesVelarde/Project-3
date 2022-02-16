const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})



const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  rating: { type: Object, required: true },
  comments: [ commentSchema ]
}, {
  timestamps: true
})




module.exports = mongoose.model('Reviews', reviewSchema)