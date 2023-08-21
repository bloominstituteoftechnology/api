const palettes = require('./data.json')

const getAll = () => palettes

const reset = Function.prototype // not needed yet

module.exports = {
  getAll,
  reset,
}
