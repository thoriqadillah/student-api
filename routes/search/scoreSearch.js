const express = require('express');
const router = express.Router();

const scoreController = require("../../controllers/scoreController");

router.get('/', scoreController.searchScore);

module.exports = router;