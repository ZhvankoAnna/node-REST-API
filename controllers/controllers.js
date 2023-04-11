const { HttpError } = require("../helpers");

const contactsServices = require("../models/contacts");

const Joi = require("joi");

const { ctrlWrapper } = require("../utils");

const contactSchema = Joi.object({
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

const getAllContacts = async (req, res) => {
  const result = await contactsServices.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServices.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactsServices.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServices.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }
  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  if (JSON.stringify(req.body) === "{}") {
    throw HttpError(400, "Missing fields");
  }
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contactsServices.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  // getAllContacts,
  // getContactById,
  // addContact,
  // removeContact,
  // updateContact,
};
