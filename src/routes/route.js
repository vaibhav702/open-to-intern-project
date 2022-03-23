const express = require("express");
const router = express.Router();
const collegeController = require("../controller/collegeController");
const internController = require("../controller/internController");

router.post("/functionup/colleges", collegeController.createCollege); //creating entry for a college
router.post("/functionup/interns", internController.createIntern);

router.get("/functionup/collegeDetails", internController.getAllIntern);

module.exports = router;
