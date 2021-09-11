const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        index: true
    },
    score: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentCourse'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
});

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;