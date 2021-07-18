const mongoose = require('mongoose');

const Semester = require('./semester')

const requiredString = {
    type: String,
    required: true
}

const studentSchema = new mongoose.Schema({
    nim: {
        type: String,
        required: true,
        max: 15
    },
    name: requiredString,
    email: requiredString,
    phone: {
        type: String,
        min: 11,
        max: 12
    },
    major: requiredString,
    semester: [Semester]
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;

