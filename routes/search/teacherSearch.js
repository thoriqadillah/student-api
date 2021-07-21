const express = require('express');
const router = express.Router();

const teacherController = require("../../controllers/teacherController");

router.get('/', teacherController.searchTeacher);

module.exports = router;