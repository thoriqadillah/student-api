const mongoose = require('mongoose');

const Subject = require('./subject');

const semesterSchema = new mongoose.Schema({
    semester: {
        type: Number,
        required: true
    },
    nim: {
        type: String,
        required: true,
        max: 15
    },
    subject: [Subject]
});

const Semester = mongoose.model('Semester', semesterSchema);
module.exports = Semester;