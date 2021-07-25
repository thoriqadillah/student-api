const express = require('express');
const router = express.Router();

const studentController = require("../controllers/studentController");

router.route('/')
    .get(studentController.getAllStudent)
    .post(studentController.addStudent)
    .delete(studentController.deleteAllStudent);


// router.get('/:_id', studentController.getStudentById)
router.patch('/:_id', studentController.editStudent)
router.delete('/:_id', studentController.deleteOneStudent);

module.exports = router;