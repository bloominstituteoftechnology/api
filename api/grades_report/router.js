const router = require('express').Router()
const redis = require('redis')
const { promisify } = require('util')

// Create a Redis client
const client = redis.createClient(process.env.REDIS_URL)
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)

router.post('/report', async (req, res) => {
  const newData = req.body
  // Retrieve existing data
  const data = JSON.parse(await getAsync('data')) || []
  data.push(newData)
  // Update data in Redis
  await setAsync('data', JSON.stringify(data))
  res.json(newData)
})

router.get('/', async (req, res) => {
  // Retrieve and send data
  const data = JSON.parse(await getAsync('data')) || []
  res.json(data)
})

module.exports = router
