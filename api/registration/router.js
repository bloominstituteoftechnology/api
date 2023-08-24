const router = require('express').Router()
const Registration = require('./model')

router.get('/reset', (req, res) => {
  Registration.reset()
  res.json({ message: 'Registration API was reset successfully' })
})

router.get('/docs', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>Registration API</title>
</head>
<body>
  <h1>Registration API</h1>
  <p>Available endpoints:</p>
  <ul>
    <li>[POST] /registration</li>
  </ul>
  <p>Click <a href="/registration/reset">HERE</a> to reset Registration.</p>
</body>
</html>
`)
})

router.post('/', Registration.validate, (req, res) => {
  res.status(201).json({
    message: `Success! Welcome, ${req.body.username}!`,
    data: req.body,
  })
})

module.exports = router
