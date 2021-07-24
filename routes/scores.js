const express = require('express');
const router = express.Router();

const scoreController = require("../controllers/scoreController");

router.route('/')
    .get(scoreController.getAllScore)
    .post(scoreController.addScore);

router.patch('/:_id', scoreController.editScore);

router.delete('/:_id', scoreController.deleteOneScore);

module.exports = router;