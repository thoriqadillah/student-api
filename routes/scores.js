const express = require('express');
const router = express.Router();

const scoreController = require("../controllers/scoreController");

router.route('/')
    .get(scoreController.getAllScore)
    .post(scoreController.addScore)
    .delete(scoreController.deleteAllScore);;

// router.get('/:_id', scoreController.getScoreById)
router.patch('/:_id', scoreController.editScore)
router.delete('/:_id', scoreController.deleteOneScore);

module.exports = router;