require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//CORS
var corsOptions = {
  origin: process.env.LOCALHOST_URL
};
app.use(cors(corsOptions));

//mongoDB Connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to College Database'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Router
//student router=============================================
const studentRouter = require('./routes/students');
app.use('/students', studentRouter);

const studentSearchRouter = require('./routes/search/studentSearch');
app.use('/students/search', studentSearchRouter);

const semesterToStudent = require('./routes/assign/semesterToStudent');
app.use('/students/assign/semester', semesterToStudent);


//semester router=============================================
const semesterRouter = require('./routes/semesters');
app.use('/semesters', semesterRouter);

const semesterSearchRouter = require('./routes/search/semesterSearch');
app.use('/semesters/search', semesterSearchRouter);

const studentToSemester = require('./routes/assign/studentToSemester');
app.use('/semesters/assign/student', studentToSemester);


//course router=============================================
const courseRouter = require('./routes/courses');
app.use('/courses', courseRouter);

const courseSearchRouter = require('./routes/search/courseSearch');
app.use('/courses/search', courseSearchRouter);


//score router=============================================
const scoreRouter = require('./routes/scores');
app.use('/scores', scoreRouter);

const scoreSearchRouter = require('./routes/search/scoreSearch');
app.use('/scores/search', scoreSearchRouter);


//teacher router=============================================
const teacherRouter = require('./routes/teachers');
app.use('/teachers', teacherRouter);

const teacherSearchRouter = require('./routes/search/teacherSearch');
app.use('/semesters/search', teacherSearchRouter);



app.listen(3000, () => console.log('Server running on port '+ process.env.LOCALHOST_URL));