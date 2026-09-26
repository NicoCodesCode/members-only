const { Router } = require("express");
const messagesController = require("../controllers/messagesController");
const ensureAuthenticated = require("../auth/ensureAuthenticated");

const router = Router();

router.use(ensureAuthenticated);

router
  .route("/new")
  .get(messagesController.renderNewMessagePage)
  .post(messagesController.createNewMessage);

module.exports = router;
