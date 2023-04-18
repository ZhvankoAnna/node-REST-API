const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

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
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const updateContactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addContactSchema,
  updateContactSchema,
  updateContactFavoriteSchema,
};

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
