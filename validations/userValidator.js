const { body } = require("express-validator");

exports.validateSignUp = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name field can't be empty")
    .isLength({ min: 1, max: 20 })
    .withMessage("First name can only be up to 20 characters")
    .isAlpha(undefined, { ignore: " " })
    .withMessage("First name can't contain special symbols nor numbers"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name field can't be empty")
    .isLength({ min: 1, max: 20 })
    .withMessage("Last name can only be up to 20 characters")
    .isAlpha(undefined, { ignore: " " })
    .withMessage("Last name can only contain letters"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username field can't be empty")
    .isLength({ min: 1, max: 20 })
    .withMessage("Username can only be up to 20 characters"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password field can't be empty"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => (value === req.body.password ? true : false))
    .withMessage("Passwords don't match"),
];
