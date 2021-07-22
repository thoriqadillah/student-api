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
    name: requiredString,
    email: requiredString,
    phone: {
        type: String,
        min: 11,
        max: 12
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }, 
});

teacherSchema.index({ nip: 1, name: 1, email: 1 });

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;