const Joi = require('@hapi/joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).send(result.error.details[0].message);
      }

      if (!req.value) {
        req.value = {}
      }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    authSchema: Joi.object().keys({
      first_name: Joi.string()
        .required(),
      last_name: Joi.string()
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(8)
        .regex(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/) //must contain one number and special character
    }),

    productSchema: Joi.object().keys({
      imagePath: Joi.string(),
      name: Joi.string()
        .required(),
      price: Joi.number()
        .positive()
        .precision(2) //limits number of decimals
        .min(0.01)
        .required(),
      description: Joi.string()
        .required(),
      category: Joi.string()
        .required()
    }),
  }
}
