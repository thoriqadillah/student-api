const express = require('express');
const router = express.Router();

const studentCourseController = require("../../controllers/studentCourseController");

router.patch('/:_id', studentCourseController.unassignTeacher);

module.exports = router;