const express = require("express");
const {
  addData,
  getData,
  updateData,
  getSingleData,
} = require("../controllers/data.controller");

const router = express.Router();

router.post("/add-data", addData);
router.get("/get-all-data", getData);
router.get("/get-single-data/:id", getSingleData);
router.put("/update-data/:id", updateData);

module.exports = router;
