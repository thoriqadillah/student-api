const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
}

const teacherSchema = new mongoose.Schema({
    nip: {
        type: String,
        required: true,
        max: 15
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }, 
    name: requiredString,
    email: requiredString,
    phone: {
        type: String,
        min: 11,
        max: 12
    },
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;