const express = require('express');
const router = express.Router();

const courseController = require("../../controllers/courseController");

router.patch('/:_id', courseController.assignNewSemester);

module.exports = router;