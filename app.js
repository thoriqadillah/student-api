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
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to College Database'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Router
const studentRouter = require('./routes/students');
app.use('/students', studentRouter);


app.listen(3000, () => console.log('Server running on port '+ process.env.LOCALHOST_URL));