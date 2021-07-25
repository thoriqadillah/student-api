const express = require('express');
const router = express.Router();

const semesterController = require("../controllers/semesterController");

router.route('/')
    .get(semesterController.getAllSemester)
    .post(semesterController.addSemester);
    
router.route('/:_id')
    .get(semesterController.getSemesterById)
    .patch(semesterController.editSemester)
    .delete(semesterController.deleteOneSemester);

module.exports = router;