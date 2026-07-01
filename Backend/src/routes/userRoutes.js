const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");
const {
  getProfile,
  updateProfile,
   changePassword,
} = require("../controllers/userController");
// const getProfile=require("../controllers/userController");
const {
  updateProfileValidation,
  changePasswordValidation,
} = require("../validators/userValidator");

router.get(
  "/profile",
  authMiddleware,
  getProfile
);
router.put(
  "/profile",
  authMiddleware,
  updateProfileValidation,
  validate,
  updateProfile
);
router.put(
  "/change-password",
  authMiddleware,
  changePasswordValidation,
  validate,
  changePassword
);
module.exports = router;