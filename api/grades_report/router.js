const router = require('express').Router()

const data = [] // in-memory db

router.post('/report', (req, res, next) => {
  data.push(req.body)
  res.json(req.body)
})

router.get('/', (req, res) => {
  res.json(data)
})

module.exports = router
