const express = require("express");

const router = express.Router();

const {
  login,
  signup,
  checkIsAdmin,
  allUser,
  deleteUser,
} = require("../controllers/UserController");
const { auths, isUser, isAdmin } = require("../middleware/Auths");

router.post("/login", login);
router.post("/signup", signup);

router.get("/test", auths, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected route tests",
  });
});

router.get("/student", auths, isUser, (req, res) => {
  res.json({
    success: true,
    message: "You are a student",
  });
});

router.get("/admin", auths, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "message to the protected route for admin",
  });
});

router.post("/isadmin", checkIsAdmin);
router.post("/alluser", allUser);
router.post("/deleteuser", deleteUser);

module.exports = router;
