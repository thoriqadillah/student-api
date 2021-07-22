const express = require('express');
const router = express.Router();

const teacherController = require("../controllers/teacherController");

router.route('/')
    .get(teacherController.getAllTeacher)
    .post(teacherController.addTeacher);

router.patch('/:_id', teacherController.editTeacher);

router.delete('/:_id', teacherController.deleteOneTeacher);

// router.delete('/', teacherController.deleteAllTeacher);

module.exports = router;