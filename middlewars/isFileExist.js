const { HttpError } = require("../helpers");

const isFileExist = (req, res, next) => {
  if (!req.file) {
    next(HttpError(400, "The file was not attached"));
  }
  next();
};

module.exports = isFileExist;
