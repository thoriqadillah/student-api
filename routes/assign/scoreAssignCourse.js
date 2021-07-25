const express = require('express');
const router = express.Router();

const courseController = require("../../controllers/courseController");

router.patch('/:_id', courseController.assignNewScore);

module.exports = router;