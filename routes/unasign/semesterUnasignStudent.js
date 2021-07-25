const express = require('express');
const router = express.Router();

const semesterController = require("../../controllers/semesterController");

router.patch('/:_id', semesterController.unasignStudent);

module.exports = router;