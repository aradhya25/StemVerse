const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

const { progressValidation } = require("../validators/progressValidator");

const {
  saveProgress,
  getMyProgress,
} = require("../controllers/progressController");

router.post("/", authMiddleware, progressValidation, validate, saveProgress);

router.get("/my-progress", authMiddleware, getMyProgress);

module.exports = router;
