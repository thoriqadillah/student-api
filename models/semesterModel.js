const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    semester: {
        type: Number,
        required: true,
        index: true
    },
    year: {
        type: String,
        required: true  
    },
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }]
});

const Semester = mongoose.model('Semester', semesterSchema);
module.exports = Semester;