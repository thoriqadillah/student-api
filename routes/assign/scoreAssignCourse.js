const express = require('express');
const router = express.Router();

const scoreController = require("../../controllers/scoreController");

router.patch('/:_id', scoreController.assignNewCourse);

module.exports = router;