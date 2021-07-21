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
const studentRouter = require('./routes/students');
app.use('/students', studentRouter);
const studentSearchRouter = require('./routes/search/studentSearch');
app.use('/students/search', studentSearchRouter);
const semesterToStudent = require('./routes/assign/semesterToStudent');
app.use('/students/assign/semester', semesterToStudent);

const courseRouter = require('./routes/courses');
app.use('/courses', courseRouter);

const semesterRouter = require('./routes/semesters');
app.use('/semesters', semesterRouter);
const semesterSearchRouter = require('./routes/search/semesterSearch');
app.use('/semesters/search', semesterSearchRouter);
const studentToSemester = require('./routes/assign/studentToSemester');
app.use('/semesters/assign/student', studentToSemester);


app.listen(3000, () => console.log('Server running on port '+ process.env.LOCALHOST_URL));