const yup = require("yup")

const updateUserSchema = yup.object({
  body: yup.object({
    name: yup.string().min(4, "Min4Characters").required("NameIsRequired"),
    email: yup.string().email().required("EmailIsRequired"),
  })
})

module.exports = {
  updateUserSchema
}
