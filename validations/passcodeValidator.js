const { body } = require("express-validator");

validatePasscode = [
  body("passcode")
    .trim()
    .notEmpty()
    .withMessage("Please enter the passcode")
    .custom((value) => (value === process.env.CLUB_PASSCODE ? true : false))
    .withMessage("Wrong passcode"),
];

module.exports = validatePasscode;
