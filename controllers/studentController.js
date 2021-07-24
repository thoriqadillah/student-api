const Student = require('../models/studentModel');
const Semester = require('../models/semesterModel');
const mongoose = require('mongoose');

module.exports = {

    getAllStudent: (req, res) => {
        Student.find({}).populate('semester') //untuk join dengan collection semester
            .then(student => {
                if (!student.length) {
                    res.status(404).json({
                        status: "fail",
                        message: "There is no student data to be found"
                    });
                } else {
                    res.status(200).json({
                        status: "success",
                        student
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while reading student data"
                });
            });
    },

    searchStudent: (req, res) => {
        //jika req.body kosong
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to insert can not be empty!"
            });
        }
        
        Student.find(req.body).populate('semester') //untuk join dengan collection semester
            .then(student => {
                if (!student.length) { //jika data kosong
                    res.status(404).json({
                        status: "fail",
                        message: "Student data was not found"
                    }); 
                } else {
                    res.status(200).json({
                        status: "success",
                        student
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while reading student data"
                });
            });
    },

    addStudent: async (req, res) => {
        //jika req.body kosong
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to insert can not be empty!"
            });
        }

        const { nim, name, email, major, enterYear } = req.body;

        //jika salah satu filed pada req.body kosong
        if (!nim) return res.status(400).json({ status: "fail", message: "Student NIM is required!" });
        if (!name) return res.status(400).json({ status: "fail", message: "Student name is required!" });
        if (!email) return res.status(400).json({ status: "fail", message: "Student email is required!" });
        if (!major) return res.status(400).json({ status: "fail", message: "Student major is required!" });  
        if (!enterYear) return res.status(400).json({ status: "fail", message: "Student enter year is required!" });
        
        try {
            const studentNIM = await Student.exists({ nim });
            const studentEmail = await Student.exists({ email });

            if (studentNIM) {
                return res.status(400).json({
                    status: "fail",
                    message: `Student with NIM ${nim} is already existed`,
                });
            }

            if (studentEmail) {
                return res.status(400).json({
                    status: "fail",
                    message: `Student with email ${email} is already existed`,
                });
            }
            
            await Student.create(req.body, (err, data) => {
                return res.status(201).json({
                    status: "success",
                    message: "Student was added successfully",
                    student: data
                });
            });

        } catch (error) {
            return res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while adding teacher data"
            });
        }
    },

    assignNewSemesterToStudent: async (req, res) => {
        const { _id } = req.params; //student id

        if (!mongoose.Types.ObjectId.isValid(_id)) { //jika _id tidak valid
            return res.status(400).json({
                status: "fail",
                message: "Id is not valid"
            });           
        }
        
        //jika req.body kosong
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to update can not be empty!"
            });
        }

        try {
            const student = await Student.findById({ _id });
            const semester = await Semester.findOne(req.body);

            if (!student) {
                return res.status(404).json({
                    status: "fail",
                    message: `Student data was not found`
                }); 
            }

            if (!semester) {
                return res.status(404).json({
                    status: "fail",
                    message: `Semester data was not found`
                }); 
            }

            await Student.updateOne({ _id }, { $push: { semester: semester._id } }, { new: true, useFindAndModify: false });
            const populatedStudent = await Student.findById({ _id }).populate('semester');

            return res.status(200).json({
                status: "success",
                message: "Student data was updated successfully",
                student: populatedStudent
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while updating student data."
            });
        }
    },

    editStudent: (req, res) => {
        const { _id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(_id)) { //jika _id tidak valid
            return res.status(400).json({
                status: "fail",
                message: "Id is not valid"
            });           
        }

        //jika req.body kosong
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to update can not be empty!"
            });
        }
        
        Student.findByIdAndUpdate({ _id }, req.body, { useFindAndModify: false })
            .then(async student => {
                const updatedData = await Student.findById({ _id });

                if (!student) { //jika data kosong
                    res.status(404).json({
                        status: "fail",
                        message: `Cannot update student data with id ${_id}. Student data was not found`
                    });
                } else {
                    res.status(200).json({
                        status: "success",
                        message: "Student data was updated successfully",
                        student: updatedData //tampilkan data yang sudah diupdate
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    status: "fail",
                    message: err.message || "Some error occurred while updating student data."
                });
            });
    },

    deleteOneStudent: async (req, res) => {
        const { _id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(_id)) { //jika _id tidak valid
            return res.status(400).json({
                status: "fail",
                message: "Id is not valid"
            });           
        }

        try {
            const student = await Student.findById({ _id });
            
            if (!student) {
                return res.status(404).json({
                    status: "fail",
                    message: `Cannot delete student data with id ${_id}. Student data was not found`
                });            
            }

            
            await Semester.updateMany({}, { $pull: { student: student._id } }, { new: true, useFindAndModify: false })
            student.remove();

            return res.status(200).json({
                status: "success",
                message: "Student data was deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while deleting student data."
            });
        }
    },
}