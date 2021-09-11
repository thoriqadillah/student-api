const express = require('express');
const router = express.Router();

const scoreController = require("../../controllers/scoreController");

router.patch('/:_id', scoreController.assignNewTeacher);

module.exports = router;