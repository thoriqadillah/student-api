const express = require('express');
const router = express.Router();

const semesterController = require("../../controllers/semesterController");

router.get('/:_id', semesterController.assignStudentToSemester);

module.exports = router;