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
    enterYear: {
        type: String,
        required: true  
    },
    semester: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester'
    }],
    
}, { timestamp: true });

studentSchema.index({ nim: 1, name: 1, email: 1 });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;

