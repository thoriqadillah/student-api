const express = require('express');
const router = express.Router();

const studentController = require("../controllers/studentController");

router.route('/')
    .get(studentController.getAllStudent)
    .post(studentController.addStudent);

router.get('/:_id', studentController.getOneStudent)

router.patch('/:_id', studentController.editStudent);

router.delete('/:_id', studentController.deleteOneStudent);

router.delete('/:_id', studentController.deleteAllStudent);

module.exports = router;