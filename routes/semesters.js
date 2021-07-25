const express = require('express');
const router = express.Router();

const semesterController = require("../controllers/semesterController");

router.route('/')
    .get(semesterController.getAllSemester)
    .post(semesterController.addSemester)
    .delete(semesterController.deleteAllSemester);
    
// router.get('/:_id', semesterController.getSemesterById)
router.patch('/:_id', semesterController.editSemester)
router.delete('/:_id', semesterController.deleteOneSemester);

module.exports = router;