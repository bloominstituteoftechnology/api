const router = require('express').Router()

router.get('/reset', (req, res) => {
  res.json({ message: 'Slow API was reset successfully' })
})

router.get('/docs', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>Slow API</title>
</head>
<body>
  <h1>Slow API</h1>
  <p>Available endpoints:</p>
  <ul>
    <li>[GET] /:anything</li>
  </ul>
  <p>Click <a href="/slow/reset">HERE</a> to reset Slow.</p>
</body>
</html>
`)
})

router.get('/:resource', (req, res) => {
  function getRandomDate() {
    var today = new Date();
    var randomMilliseconds = Math.floor(Math.random() * today.getTime()); // Generate a random time in milliseconds up to now
    var randomDate = new Date(today - randomMilliseconds); // Subtract the random milliseconds from the current time
    return randomDate.toDateString(); // Convert the date to a human-readable string
  }
  function getRandomInt() {
    return Math.floor(Math.random() * 499) + 501
  }
  const response = {
    id: getRandomInt(),
    created_on: getRandomDate(),
    name: req.params.resource,
  }
  setTimeout(() => {
    res.json(response)
  }, getRandomInt())
})

module.exports = router
