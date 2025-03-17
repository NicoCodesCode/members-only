const { body } = require("express-validator");

const validateMessage = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title field can't be empty")
    .isLength({ min: 1, max: 20 })
    .withMessage("Title can only be up to 20 characters"),
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Text field can't be empty")
    .isLength({ min: 1, max: 255 })
    .withMessage("Text can only be up to 255 characters"),
];

module.exports = validateMessage;
