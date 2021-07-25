const express = require('express');
const router = express.Router();

const courseController = require("../controllers/courseController");

router.route('/')
    .get(courseController.getAllCourse)
    .post(courseController.addCourse)
    .delete(courseController.deleteAllCourse);

// router.get('/:_id', courseController.getCourseById)
router.patch('/:_id', courseController.editCourse)
router.delete('/:_id', courseController.deleteOneCourse);

module.exports = router;