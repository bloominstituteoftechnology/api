const yup = require('yup')
const names = require('./data.json')

const e = {
  // username
  usernameType: 'username must be a string',
  usernameRequired: 'username is required',
  usernameMin: 'username must be at least 3 characters',
  usernameMax: 'username cannot exceed 20 characters',
  // favLanguage
  favLanguageType: 'favLanguage must be a string',
  favLanguageRequired: 'favLanguage is required',
  favLanguageOptions: 'favLanguage must be either javascript or rust',
  // favFood
  favFoodType: 'favFood must be a string',
  favFoodRequired: 'favFood is required',
  favFoodOptions: 'favFood must be either broccoli, spaghetti or pizza',
  // agreement
  agreementType: 'agreement must be a boolean',
  agreementRequired: 'agreement is required',
  agreementOptions: 'agreement must be accepted',
}

const userSchema = yup.object().shape({
  username: yup.string().typeError(e.usernameType).trim()
    .required(e.usernameRequired)
    .min(3, e.usernameMin).max(20, e.usernameMax),
  favLanguage: yup.string().typeError(e.favLanguageType)
    .required(e.favLanguageRequired).trim()
    .oneOf(['javascript', 'rust'], e.favLanguageOptions),
  favFood: yup.string().typeError(e.favFoodType)
    .required(e.favFoodRequired).trim()
    .oneOf(['broccoli', 'spaghetti', 'pizza'], e.favFoodOptions),
  agreement: yup.boolean().typeError(e.agreementType)
    .required(e.agreementRequired)
    .oneOf([true], e.agreementOptions),
})

const validateUser = async data => {
  try {
    const valid = await userSchema.validate(data)
    return [null, valid]
  } catch (err) {
    const error = err.message
    return [error, null]
  }
}

const validate = async (req, res, next) => {
  const [error, validated] = await validateUser(req.body)
  if (error) {
    next({ message: error, status: 422 })
  } else if (names.find(name => name == validated.username)) {
    next({ message: `Sorry! The username ${validated.username} is taken`, status: 409 })
  } else {
    req.body = validated
    next()
  }
}

module.exports = {
  validate,
  reset: Function.prototype,
}
