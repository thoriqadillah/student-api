const express = require('express');
const router = express.Router();

const studentController = require("../../controllers/studentController");

router.patch('/:_id', studentController.assignSemesterToStudent);

module.exports = router;