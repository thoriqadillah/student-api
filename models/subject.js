const mongoose = require('mongoose');

const Score = require('./score');
const Teacher = require('./teacher');

const requiredString = {
    type: String,
    required: true
}

const subjectSchema = new mongoose.Schema({
    semester: {
        type: Number,
        required: true
    },
    nim: {
        type: String,
        required: true,
        max: 15
    },
    name: requiredString,
    weight: {
        type: Number,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    score: [Score],
    teacher: [Teacher]
});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;