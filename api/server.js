const express = require('express')
const cors = require('cors')
const usersRouter = require('./users/router')

const server = express()

server.use(express.json())

server.use(cors())

server.use('/users', usersRouter)

server.use('*', (err, req, res, next) => {
  res.status(404).json({
    error: 'Page not found',
  })
})


server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message,
  })
})

module.exports = server
