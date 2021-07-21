const express = require('express');
const router = express.Router();

const courseController = require("../controllers/courseController");

router.route('/')
    .get()
    .post();

// router.route('/:_id')
//     .get()
//     .post();

// router.patch('/:_id', );

// router.delete('/:_id', );

// router.delete('/:_id', );

module.exports = router;