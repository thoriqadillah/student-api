const express = require('express');
const router = express.Router();

const semesterController = require("../controllers/semesterController");

router.route('/')
    .get(semesterController.getAllSemester)
    .post(semesterController.addSemester);

router.patch('/:_id', semesterController.editSemester);

router.delete('/:_id', semesterController.deleteOneSemester);

router.delete('/', semesterController.deleteAllSemester);

module.exports = router;