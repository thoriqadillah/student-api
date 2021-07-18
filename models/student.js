const mongoose = require('mongoose');

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
    semester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester'
    },
    
}, { timestamp: true });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;

