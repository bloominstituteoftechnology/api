const router = require('express').Router()
const Yup = require('yup')

let id = 1
const getNextId = () => id++
const dogBreeds = ['Dalmatian', 'German Shepherd', 'Golden Retriever', 'Boxer', 'Bulldog']
let dogs = [
  {
    id: getNextId(),
    name: "Buddy",
    breed: "Dalmatian",
    adopted: false
  },
  {
    id: getNextId(),
    name: "Max",
    breed: "German Shepherd",
    adopted: true
  },
  {
    id: getNextId(),
    name: "Bella",
    breed: "Boxer",
    adopted: true
  },
]

router.get('/breeds', (_, res) => {
  res.json(dogBreeds)
})

router.get('/', (_, res) => {
  res.json(dogs)
})

router.delete('/:id', (req, res, next) => {
  const dog = dogs.find(dg => dg.id == req.params.id)
  if (!dog) {
    return next({ status: 404, message: 'Dog not found' })
  }
  dogs = dogs.filter(dg => dg.id != req.params.id)
  res.json(dog)
})

const putSchema = Yup.object().shape({
  name: Yup.string().nullable().min(3),
  breed: Yup.string().oneOf(dogBreeds, `Breed must be one of: ${dogBreeds.join(', ')}`).nullable(),
  adopted: Yup.boolean().nullable(),
})
  .test(
    'at-least-one-field',
    'Provide properties to update',
    function (obj) {
      return obj.name != null ||
        obj.breed != null ||
        obj.adopted != null
    }
  )

router.put('/:id', async (req, res, next) => {
  const dog = dogs.find(dg => dg.id == req.params.id)
  if (!dog) {
    return next({ status: 404, message: 'Dog not found' })
  }
  try {
    const {
      name,
      breed,
      adopted,
    } = await putSchema.validate(req.body, { stripUnknown: true })
    if (name) dog.name = name
    if (breed) dog.breed = breed
    if (adopted !== undefined) dog.adopted = adopted
    res.json(dog)
  } catch ({ message }) {
    return next({ status: 422, message })
  }
})

const postSchema = Yup.object().shape({
  name: Yup.string().required('`name` required').min(3, 'Name too short'),
  breed: Yup.string().required('`breed` required').oneOf(dogBreeds, `Breed must be one of: ${dogBreeds.join(', ')}`),
  adopted: Yup.boolean().nullable(),
})

router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      breed,
      adopted,
    } = await postSchema.validate(req.body, { stripUnknown: true })
    const newDog = { id: getNextId(), name, breed, adopted: adopted ?? false }
    dogs.push(newDog)
    res.status(201).json(newDog)
  } catch ({ message }) {
    return next({ status: 422, message })
  }
})

router.get('/docs', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>Docs API</title>
</head>
<body>
  <h1>Dogs API</h1>
  <p>Available endpoints:</p>
  <ul>
    <li>[GET] /dogs</li>
    <li>[GET] /dogs/breeds</li>
    <li>[POST] /dogs</li>
    <li>[PUT] /dogs/:id</li>
    <li>[DELETE] /dogs/:id</li>
  </ul>
</body>
</html>
`)
})

module.exports = router
