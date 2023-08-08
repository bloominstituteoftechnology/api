const router = require('express').Router()
const User = require('./model')

const getUser = (req, res, next) => { // middleware
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        next({ status: 404, message: 'The user with the specified ID does not exist' })
      }
    })
    .catch(next)
}

router.get('/reset', (req, res) => {
  User.reset()
  res.json({ message: 'API was reset successfully' })
})

router.get('/docs', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>API users</title>
</head>
<body>
  <h1>API users</h1>
  <p>Available endpoints:</p>
  <ul>
    <li>[GET] /users</li>
    <li>[GET] /users/:id</li>
    <li>[POST] /users</li>
    <li>[DELETE] /users/:id</li>
    <li>[PUT] /users/:id</li>
  </ul>
  <p>Click <a href="/users/reset">HERE</a> to reset the data.</p>
</body>
</html>
`)
})

router.post('/', (req, res, next) => {
  const { name, bio } = req.body

  if (!name || !bio) {
    next({ status: 422, message: 'Please provide name and bio' })
  } else {
    User.insert(req.body)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(next)
  }
})

router.get('/', (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
})

router.get('/:id', getUser, (req, res, next) => {
  res.status(200).json(req.user)
})

router.delete('/:id', getUser, (req, res, next) => {
  User.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.user)
    })
    .catch(next)
})

router.put('/:id', getUser, (req, res, next) => {
  const { name, bio } = req.body

  if (!name || !bio) {
    res.status(400).json({
      message: 'Please provide name and bio for the user',
    })
  } else {
    User.update(req.params.id, { name, bio })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  }
})

module.exports = router
