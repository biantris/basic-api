const yup = require("yup");

const addUserSchema = yup.object({
  body: yup.object({
    name: yup.string().min(4, "Min4Characters").required("NameIsRequired"),
    email: yup.string().email().required("EmailIsRequired"),
    password: yup
      .string()
      .min(5, "Min5Characters")
      .required("PasswordIsRequired"),
  }),
});

module.exports = {
  addUserSchema,
};
