const express = require('express');
const router = express.Router();

const studentCourseController = require("../controllers/studentCourseController");

router.route('/')
    .get(studentCourseController.getAllCourse)
    .post(studentCourseController.addCourse)
    .delete(studentCourseController.deleteAllCourse);

// router.get('/:_id', studentCourseController.getCourseById)
router.patch('/:_id', studentCourseController.editCourse)
router.delete('/:_id', studentCourseController.deleteOneCourse);

module.exports = router;