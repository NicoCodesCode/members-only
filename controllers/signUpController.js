const userValidator = require("../validations/userValidator");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const renderSignUpPage = (req, res) => {
  if (req.errors) {
    return res.render("signUpForm", {
      title: "Sign Up",
      errors: req.errors,
      invalidInput: req.body,
    });
  }

  res.render("signUpForm", { title: "Sign Up", invalidInput: {} });
};

const signUpUser = [
  userValidator.validateSignUp,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.errors = errors.array();
      return next();
    }

    const user = req.body;

    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await db.insertUser({ ...user, password: hashedPassword });
      res.redirect("/log-in");
    } catch (error) {
      next(error);
    }
  },
  renderSignUpPage,
];

module.exports = { renderSignUpPage, signUpUser };
