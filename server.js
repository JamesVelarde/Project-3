const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const mongoose = require('mongoose')
mongoose.connect(
  'mongodb://localhost/moviedb',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.log(err)
    else console.log('Mongoose connected!')
  })

const expressServer = express()

expressServer.use(bodyParser.json())

expressServer.use((req, res, next) => {
  console.log(`Incoming ${req.method} to ${req.url}`)
  next()
})

expressServer.use('/api', router)
//this server is continuously listening for requests to it
expressServer.listen(8000)