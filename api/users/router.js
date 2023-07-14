const router = require('express').Router()
const User = require('./model')

const getUser = (req, res, next) => {
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

router.get('/reset', (req, res) => {
  User.reset()
  res.json({ message: 'API was reset successfully' })
})

router.get('/docs', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>Using Postman</title>
</head>
<body>
  <h1>Testing APIs with Postman</h1>
  <p>Test the following endpoints:</p>
  <ul>
    <li>[GET] /api/users</li>
    <li>[GET] /api/users/:id</li>
    <li>[POST] /api/users</li>
    <li>[DELETE] /api/users/:id</li>
    <li>[PUT] /api/users/:id</li>
  </ul>
  <p>Click <a href="https://testing-apis-postman.herokuapp.com/api/reset">HERE</a> to reset the data.</p>
</body>
</html>
  `)
})

module.exports = router
