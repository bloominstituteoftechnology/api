const express = require('express')
const cors = require('cors')

const usersRouter = require('./users/router')
const planetsRouter = require('./planets/router')
const slowRouter = require('./slow/router')
const palettesRouter = require('./palettes/router')
const registrationRouter = require('./registration/router')
const pizzaRouter = require('./pizza/router')
const crankyLoginRouter = require('./cranky_login/router')
const acmeAuthRouter = require('./acme_auth/router')
const dogsRouter = require('./dogs/router')
// const gradesRouter = require('./grades_report/router') // redis is crashing

const server = express()

server.use(express.json())

server.use(cors())

server.use('/users', usersRouter)
server.use('/planets', planetsRouter)
server.use('/slow', slowRouter)
server.use('/palettes', palettesRouter)
server.use('/registration', registrationRouter)
server.use('/pizza', pizzaRouter)
server.use('/cranky_login', crankyLoginRouter)
server.use('/acme', acmeAuthRouter)
server.use('/dogs', dogsRouter)
// server.use('/grades', gradesRouter)

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
    <li><a href="/slow/docs">Slow</a></li>
    <li><a href="/palettes/docs">Palettes</a></li>
    <li><a href="/registration/docs">Registration</a></li>
    <li><a href="/pizza/docs">Pizza</a></li>
    <li><a href="/cranky_login/docs">Cranky Login</a></li>
    <li><a href="/acme/docs">Acme Auth</a></li>
    <li><a href="/dogs/docs">Dogs</a></li>
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
