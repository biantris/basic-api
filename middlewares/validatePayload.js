const yup = require("yup");

const validatePayload = (schema) => async (req, res, next) => {
  try {
    await schema.validate(
      {
        body: req.body,
        params: req.params,
        query: req.query,
      },
      { abortEarly: false }
    );

    return next();
  } catch (error) {
    return res.status(422).json({ errors: error.errors });
  }
};

module.exports = validatePayload;
