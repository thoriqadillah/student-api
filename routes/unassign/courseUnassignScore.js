const express = require('express');
const router = express.Router();

const courseController = require("../../controllers/courseController");

router.patch('/:_id', courseController.unassignScore);

module.exports = router;