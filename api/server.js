const express = require('express')
const cors = require('cors')
const usersRouter = require('./users/router')

const server = express()

server.use(express.json())

server.use(cors())

server.use('/users', usersRouter)

server.use('*', (req, res, next) => {
  res.status(404).json({
    error: 'Page not found',
  })
})

server.use((err, req, res, next) => {
  const message = err.message || 'Unknown error happened'
  const status = err.status || 500
  const reason = err.reason
  const payload = { message }
  if (reason) payload.reason = reason
  res.status(status).json(payload)
})

module.exports = server
