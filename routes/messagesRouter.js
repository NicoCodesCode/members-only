const { Router } = require("express");
const messagesController = require("../controllers/messagesController");

const router = Router();

router
  .route("/new")
  .get(messagesController.renderNewMessagePage)
  .post(messagesController.createNewMessage);

module.exports = router;
