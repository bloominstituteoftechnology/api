const router = require('express').Router()
const Model = require('./model')

router.get('/docs', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>Acme Auth API</title>
</head>
<body>
  <h1>AcmeAuth API</h1>
  <p>Available endpoints:</p>
  <ul>
    <li>[POST] /acme/login</li>
    <li>[GET] /acme/is_authed</li>
  </ul>
</body>
</html>
`)
})

router.post('/login', Model.validate, (req, res) => {
  res.status(200).json({
    message: `Welcome back, ${req.body.username}!`,
    token: req.token,
  })
})

router.get('/is_authed', Model.checkToken, (req, res) => {
  res.status(200).json({
    message: `Token checks out, ${req.jwt.subject}! You have ${req.jwt.remaining} seconds left in your session`,
  })
})

module.exports = router
