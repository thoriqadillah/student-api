const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
}

const scoreSchema = new mongoose.Schema({
    subject_id: requiredString,
    category: requiredString
});

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;