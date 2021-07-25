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

const assignNewSemesterInStudent = require('./routes/assign/studentAssignSemester');
app.use('/students/assign/semester', assignNewSemesterInStudent);

const unassignSemesterInStudent = require('./routes/unassign/studentUnassignSemester');
app.use('/students/unassign/semester', unassignSemesterInStudent);


//semester router=============================================
const semesterRouter = require('./routes/semesters');
app.use('/semesters', semesterRouter);

const semesterSearchRouter = require('./routes/search/semesterSearch');
app.use('/semesters/search', semesterSearchRouter);

const assignNewStudentInSemester = require('./routes/assign/semesterAssignStudent');
app.use('/semesters/assign/student', assignNewStudentInSemester);

const unassignStudentInSemester = require('./routes/unassign/semesterUnassignStudent');
app.use('/semesters/unassign/student', unassignStudentInSemester);

const unassignCourseInSemester = require('./routes/unassign/semesterUnassignCourse');
app.use('/semesters/unassign/course', unassignCourseInSemester);


//course router=============================================
const courseRouter = require('./routes/courses');
app.use('/courses', courseRouter);

const courseSearchRouter = require('./routes/search/courseSearch');
app.use('/courses/search', courseSearchRouter);

// course un/assign score
const assignNewScoreInCourse = require('./routes/assign/courseAssignScore');
app.use('/courses/assign/score', assignNewScoreInCourse);

const unassignScoreInCourse = require('./routes/unassign/courseUnassignScore');
app.use('/courses/unassign/score', unassignScoreInCourse);
// course un/assign semester
const assignNewSemesterInCourse = require('./routes/assign/courseAssignSemester');
app.use('/courses/assign/semester', assignNewSemesterInCourse);

const unassignSemesterInCourse = require('./routes/unassign/courseUnassignSemester');
app.use('/courses/unassign/semester', unassignSemesterInCourse);
// course un/assign student
const assignNewStudentInCourse = require('./routes/assign/courseAssignStudent');
app.use('/courses/assign/student', assignNewStudentInCourse);

const unassignStudentInCourse = require('./routes/unassign/courseUnassignStudent');
app.use('/courses/unassign/student', unassignStudentInCourse);
// course un/assign teacher
const assignNewTeacherInCourse = require('./routes/assign/courseAssignTeacher');
app.use('/courses/assign/teacher', assignNewTeacherInCourse);

const unassignTeacherInCourse = require('./routes/unassign/courseUnassignTeacher');
app.use('/courses/unassign/teacher', unassignTeacherInCourse);


//score router=============================================
const scoreRouter = require('./routes/scores');
app.use('/scores', scoreRouter);

const scoreSearchRouter = require('./routes/search/scoreSearch');
app.use('/scores/search', scoreSearchRouter);

const assignNewCourseInScore = require('./routes/assign/scoreAssignCourse');
app.use('/scores/assign/course', assignNewCourseInScore);

const unassignCourseInScore = require('./routes/unassign/scoreUnassignCourse');
app.use('/scores/unassign/course', unassignCourseInScore);


//teacher router=============================================
const teacherRouter = require('./routes/teachers');
app.use('/teachers', teacherRouter);

const teacherSearchRouter = require('./routes/search/teacherSearch');
app.use('/teachers/search', teacherSearchRouter);

const assignNewCourseInTeacher = require('./routes/assign/teacherAssignCourse');
app.use('/teachers/assign/course', assignNewCourseInTeacher);

const unassignCourseInTeacher = require('./routes/unassign/teacherUnassignCourse');
app.use('/teachers/unassign/course', unassignCourseInTeacher);



app.listen(3000, () => console.log('Server running on port '+ process.env.LOCALHOST_URL));