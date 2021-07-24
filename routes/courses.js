const express = require('express');
const router = express.Router();

const courseController = require("../controllers/courseController");

router.route('/')
    .get(courseController.getAllCourse)
    .post(courseController.addCourse);

router.patch('/:_id', courseController.editCourse);

router.delete('/:_id', courseController.deleteOneCourse);

module.exports = router;