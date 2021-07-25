const express = require('express');
const router = express.Router();

const teacherController = require("../../controllers/teacherController");

router.patch('/:_id', teacherController.assignNewCourse);

module.exports = router;