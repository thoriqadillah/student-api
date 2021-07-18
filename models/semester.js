const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    semester: {
        type: Number,
        required: true
    },
    nim: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }
});

const Semester = mongoose.model('Semester', semesterSchema);
module.exports = Semester;