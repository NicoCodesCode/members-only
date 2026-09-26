const { Router } = require("express");
const membersController = require("../controllers/membersController");
const ensureAuthenticated = require("../auth/ensureAuthenticated");

const router = Router();

router.use(ensureAuthenticated);

router
  .route("/")
  .get(membersController.renderJoinPage)
  .post(membersController.joinTheClub);

module.exports = router;
