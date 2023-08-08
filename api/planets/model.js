const reset = () => {
  // todo
}

const getAll = () => {
  return [
    {
      "id": 1,
      "name": "Mercury",
      "diameter": 4879,
      "rotation_period": 58.6,
      "rotation_around_sun": 88
    },
    {
      "id": 2,
      "name": "Venus",
      "diameter": 12104,
      "rotation_period": 243,
      "rotation_around_sun": 225
    },
    {
      "id": 3,
      "name": "Earth",
      "diameter": 12756,
      "rotation_period": 24,
      "rotation_around_sun": 365
    },
    {
      "id": 4,
      "name": "Mars",
      "diameter": 6792,
      "rotation_period": 24.6,
      "rotation_around_sun": 687
    },
    {
      "id": 5,
      "name": "Jupiter",
      "diameter": 142984,
      "rotation_period": 9.9,
      "rotation_around_sun": 4332
    },
    {
      "id": 6,
      "name": "Saturn",
      "diameter": 120536,
      "rotation_period": 10.7,
      "rotation_around_sun": 10759
    },
    {
      "id": 7,
      "name": "Uranus",
      "diameter": 51118,
      "rotation_period": 17.2,
      "rotation_around_sun": 30687
    },
    {
      "id": 8,
      "name": "Neptune",
      "diameter": 49528,
      "rotation_period": 16.1,
      "rotation_around_sun": 60190
    },
    {
      "id": 9,
      "name": "Pluto",
      "diameter": 2370,
      "rotation_period": 153.3,
      "rotation_around_sun": 90560
    }
  ]
}

module.exports = {
  getAll,
  reset,
}
