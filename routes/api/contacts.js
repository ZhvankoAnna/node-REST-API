const express = require("express");

const router = express.Router();

const contactsControllers = require("../../controllers/controllers");

const {validateBody} = require("../../utils")

const schemas = require("../../schemas/contacts")

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", contactsControllers.getContactById);

router.post("/", validateBody(schemas.addContactSchema), contactsControllers.addContact);

router.delete("/:contactId", contactsControllers.removeContact);

router.put("/:contactId", validateBody(schemas.updateContactSchema), contactsControllers.updateContact);

module.exports = router;
