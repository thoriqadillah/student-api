const mongoose = require('mongoose');

const Score = require('./score');
const Teacher = require('./teacher');

const requiredString = {
    type: String,
    required: true
}

const subjectSchema = new mongoose.Schema({
    semester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
    score: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Score'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }
});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;