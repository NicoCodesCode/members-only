const messagesController = require("./messagesController");
const { format } = require("date-fns");

exports.renderHomePage = [
  messagesController.getAllMessages,
  (req, res) => {
    res.render("home", {
      title: "Members Only",
      messages: req.messages,
      format,
    });
  },
];
