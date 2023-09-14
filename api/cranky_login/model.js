const yup = require('yup')

const e = {
  // username
  usernameType: 'username must be a string',
  usernameRequired: 'username is required',
  usernameMin: 'username must be at least 3 characters',
  usernameMax: 'username cannot exceed 20 characters',
  // password
  passwordType: 'password must be a string',
  passwordRequired: 'password is required',
  passwordMin: 'password must be at least 6 characters',
}

const credentialsSchema = yup.object().shape({
  username: yup.string().typeError(e.usernameType).trim()
    .required(e.usernameRequired)
    .min(3, e.usernameMin).max(20, e.usernameMax),
  password: yup.string().typeError(e.passwordType)
    .required(e.passwordRequired)
    .min(6, e.passwordMin),
})

const validateUser = async data => {
  try {
    const valid = await credentialsSchema.validate(data)
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
  } else if (Math.floor(Math.random() * 2) % 2 == 0) {
    next({ message: `Sorry! We don't want you here. Go away now!`, status: 401 })
  } else {
    req.body = validated
    next()
  }
}

module.exports = {
  validate,
}
