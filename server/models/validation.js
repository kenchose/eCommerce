const Joi = require('@hapi/joi');

const registerValidation = (user) => {
    let schema = {
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .required()
    };
    return Joi.validate(user, schema);
};

const loginValidation = (user) => {
    let schema = {
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .required()
    };
    return Joi.validate(user, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;