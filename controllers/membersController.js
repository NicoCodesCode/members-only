const validatePasscode = require("../validations/passcodeValidator");
const { validationResult } = require("express-validator");
const db = require("../db/queries");

const renderJoinPage = (req, res) => {
  if (req.errors) {
    return res.render("joinForm", {
      title: "Join the Club",
      errors: req.errors,
    });
  }

  res.render("joinForm", { title: "Join the Club" });
};

const joinTheClub = [
  validatePasscode,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.errors = errors.array();
      return next();
    }

    try {
      await db.becomeMember(res.locals.currentUser.id);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  },
  renderJoinPage,
];

module.exports = { renderJoinPage, joinTheClub };
