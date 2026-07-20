const express = require("express");
const router = express.Router();

const {
  createShortLink,
  redirectLink,
  getAnalytics,
  getAllLinks,
  generateQR,
} = require("../controllers/linkControllers");
router.post("/shorten", createShortLink);
router.get("/analytics", getAnalytics);
router.get("/all", getAllLinks);
router.get("/qr/:short_code", generateQR);
router.get("/:short_code", redirectLink);
module.exports = router;
