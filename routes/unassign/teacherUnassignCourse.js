const express = require('express');
const router = express.Router();

const teacherController = require("../../controllers/teacherController");

router.patch('/:_id', teacherController.unassignCourse);

module.exports = router;