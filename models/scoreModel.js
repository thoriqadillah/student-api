const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        index: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
});

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;