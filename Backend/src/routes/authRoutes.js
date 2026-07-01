const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  register,
  login,
  profile,
  logout,
} = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");

const validate = require("../middleware/validationMiddleware");
router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.post("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, profile);

module.exports = router;
