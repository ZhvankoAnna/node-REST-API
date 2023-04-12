const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required field "name"`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required field "email"`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required field "phone"`,
  }),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = { addContactSchema, updateContactSchema };
