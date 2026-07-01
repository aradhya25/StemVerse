const { param } = require("express-validator");

exports.uuidValidation = (paramName = "id") => {
  return [param(paramName).isUUID().withMessage(`Invalid ${paramName}`)];
};
