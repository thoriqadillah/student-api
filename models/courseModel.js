const mongoose = require('mongoose');

const Score = require('./scoreModel');
const Teacher = require('./teacherModel');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    weight: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
    },
    semester: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester'
    }],
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    score: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Score'
    }],
    teacher: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;