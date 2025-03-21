const validateMessage = require("../validations/messageValidator");
const { validationResult } = require("express-validator");
const db = require("../db/queries");
const { format } = require("date-fns");

const renderNewMessagePage = (req, res) => {
  if (req.errors) {
    return res.render("newMessageForm", {
      title: "New Message",
      invalidInput: req.body,
      errors: req.errors,
    });
  }

  res.render("newMessageForm", { title: "New Message", invalidInput: {} });
};

const createNewMessage = [
  validateMessage,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.errors = errors.array();
      return next();
    }

    const message = req.body;
    const date = format(new Date(), "yyyy-MM-dd");
    const userId = res.locals.currentUser.id;

    try {
      await db.createNewMessage(message, date, userId);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  },
  renderNewMessagePage,
];

const getAllMessages = async (req, res, next) => {
  const messages = await db.getAllMessages();
  req.messages = messages;
  next();
};

module.exports = { renderNewMessagePage, createNewMessage, getAllMessages };
