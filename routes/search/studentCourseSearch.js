const express = require('express');
const router = express.Router();

const studentCourseController = require("../../controllers/studentCourseController");

router.get('/', studentCourseController.searchCourse);

module.exports = router;