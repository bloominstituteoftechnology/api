const router = require('express').Router()
const Palette = require('./model')

router.get('/reset', (req, res) => {
  Palette.reset()
  res.json({ message: 'Palettes API was reset successfully' })
})

router.get('/docs', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>Palettes API</title>
</head>
<body>
  <h1>Palettes API</h1>
  <p>Available endpoints:</p>
  <ul>
    <li>[GET] /palettes</li>
  </ul>
  <p>Click <a href="/palettes/reset">HERE</a> to reset Palettes.</p>
</body>
</html>
`)
})

router.get('/*', (req, res) => {
  res.json(Palette.getAll())
})

module.exports = router
