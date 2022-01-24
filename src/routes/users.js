var express = require("express");
var router = express.Router();

const { isAuthorized } = require("../middleware/auth");
const {
  getUserList,
  getUserDeatil,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", isAuthorized, getUserList);
router.get("/:id", getUserDeatil);
router.post("/", isAuthorized, addUser);
router.put("/:id", isAuthorized, updateUser);
router.delete("/:id", isAuthorized, deleteUser);
//create getrewards logic

module.exports = router;
