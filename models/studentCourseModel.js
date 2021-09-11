const mongoose = require('mongoose');

const studentCourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    weight: {
        type: Number,
        required: true
    },
    semester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }
});

const StudentCourse = mongoose.model('StudentCourse', studentCourseSchema);
module.exports = StudentCourse;