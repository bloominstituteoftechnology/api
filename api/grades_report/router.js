const router = require('express').Router()
const redis = require('redis')

const client = redis.createClient({
  url: process.env.REDIS_URL // Ensure this is correctly set
})

client.connect().catch(console.error)

router.post('/report', async (req, res) => {
  const newData = req.body
  let data = []
  try {
    const rawData = await client.get('data')
    if (rawData) data = JSON.parse(rawData)
    data.push(newData)
    await client.set('data', JSON.stringify(data))
    res.json(newData)
  } catch (error) {
    console.error('Redis error:', error)
    res.status(500).send('Server Error')
  }
})

router.get('/', async (req, res, next) => {
  try {
    const rawData = await client.get('data')
    const data = rawData ? JSON.parse(rawData) : []
    res.json(data)
  } catch (error) {
    console.error('Redis error:', error)
    next({ message: error.message })
  }
})

module.exports = router
