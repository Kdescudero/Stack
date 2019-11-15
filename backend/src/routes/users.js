const { Router } = require("express");
const router = Router();

const {
  getUsers,
  createUsers,
  deleteUsers
} = require("../controllers/users.controller");

router
  .route("/api/users")
  .get(getUsers)
  .post(createUsers);

router.route("/api/users/:id").delete(deleteUsers);

module.exports = router;
