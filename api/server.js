const express = require('express')
const cors = require('cors')
const usersRouter = require('./users/router')

const server = express()

server.use(express.json())

server.use(cors())

server.use('/users', usersRouter)

server.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Web APIs Bloom</title>
</head>
<body>
  <h1>Web APIs Bloom</h1>
  <p>Available routers:</p>
  <ul>
    <li><a href="/users/docs">Users</a></li>
    <li><a href="/planets/docs">Planets</a></li>
  </ul>
</body>
</html>
`)
})

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
