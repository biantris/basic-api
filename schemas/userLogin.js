const yup = require("yup")

const userLoginSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required("EmailIsRequired"),
    password: yup.string().min(5).required("PasswordIsRequired")
  })
})

module.exports = {
  userLoginSchema
}
