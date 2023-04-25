const express = require("express");

const contactsControllers = require("../../controllers/contacts-controllers");

const { isValidId, authenticate } = require("../../middlewars");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.use(authenticate);

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", isValidId, contactsControllers.getContactById);

router.post(
  "/",
  validateBody(schemas.addContactSchema),
  contactsControllers.addContact
);

router.delete("/:contactId", isValidId, contactsControllers.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addContactSchema),
  contactsControllers.updateContact
);

router.patch(
  "/:contactId",
  isValidId,
  validateBody(schemas.updateContactSchema),
  contactsControllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateContactFavoriteSchema),
  contactsControllers.updateContact
);

module.exports = router;
