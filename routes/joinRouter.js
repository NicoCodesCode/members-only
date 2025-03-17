const { Router } = require("express");
const membersController = require("../controllers/membersController");

const router = Router();

router
  .route("/")
  .get(membersController.renderJoinPage)
  .post(membersController.joinTheClub);

module.exports = router;
