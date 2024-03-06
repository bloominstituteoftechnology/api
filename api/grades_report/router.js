const router = require('express').Router()

const data = []

router.post('/report', (req, res, next) => {
  data.push(req.body)
  res.json('ok')
})

router.get('/', (req, res) => {
  res.json(data)
})

module.exports = router
