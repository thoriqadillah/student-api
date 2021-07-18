const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
}

const scoreSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    category: requiredString
});

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;