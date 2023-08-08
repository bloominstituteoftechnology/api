const router = require('express').Router()
const Planet = require('./model')

router.get('/reset', (req, res) => {
  Planet.reset()
  res.json({ message: 'Planets API was reset successfully' })
})

router.get('/docs', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>Planets API</title>
</head>
<body>
  <h1>Planets API</h1>
  <p>Available endpoints:</p>
  <ul>
    <li>[GET] /planets</li>
  </ul>
  <p>Click <a href="/planets/reset">HERE</a> to reset Planets.</p>
</body>
</html>
`)
})

router.get('/', (req, res) => {
  res.json(Planet.getAll())
})

module.exports = router
