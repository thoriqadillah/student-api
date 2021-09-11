const mongoose = require('mongoose');

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
    semester: { //ganjil atau genap
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;