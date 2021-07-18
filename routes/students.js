const express = require('express');
const router = express.Router();

const studentController = require("../controllers/studentController");

router.route('/students')
    .get(studentController.getAllStudent);
    

router.patch('/students/:nim');
router.delete('/students/:nim');

module.exports = router;