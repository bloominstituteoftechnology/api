const router = require('express').Router()
const CrankyLogin = require('./model')

router.get('/docs', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>Cranky Login API</title>
</head>
<body>
  <h1>CrankyLogin API</h1>
  <p>Available endpoints:</p>
  <ul>
    <li>[POST] /cranky_login</li>
  </ul>
</body>
</html>
`)
})

router.post('/', CrankyLogin.validate, (req, res) => {
  res.status(200).json({
    message: `Welcome back, ${req.body.username}! What took you so long?`,
  })
})

module.exports = router
