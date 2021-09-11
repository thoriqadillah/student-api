const express = require('express');
const router = express.Router();

const studentCourseController = require("../../controllers/studentCourseController");

router.patch('/:_id', studentCourseController.unassignStudent);

module.exports = router;