const Student = require('../models/studentModel');
const Semester = require('../models/semesterModel');

module.exports = {

    getAllStudent: (req, res) => {
        Student.find({}).populate('semester') //untuk join dengan collection semester
            .then(student => {
                if (!student) {
                    res.status(404).json({
                        status: "success",
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
                    message: error.message || "Some error occurred while reading student data."
                });
            });
    },

    searchStudent: (req, res) => {
        Student.find(req.body).populate('semester') //untuk join dengan collection semester
            .then(student => {
                if (!student) {
                    res.status(404).json({
                        status: "success",
                        message: "Student not found"
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
                    message: error.message || "Error retrieving student data"
                });
            });
    },

    addStudent: (req, res) => {
        const { nim, name, email, major, enterYear } = req.body;

        if (!nim) return res.status(400).json({ status: "fail", message: "NIM is required!" });
        if (!name) return res.status(400).json({ status: "fail", message: "Name is required!" });
        if (!email) return res.status(400).json({ status: "fail", message: "Email is required!" });
        if (!major) return res.status(400).json({ status: "fail", message: "Major is required!" });  
        if (!enterYear) return res.status(400).json({ status: "fail", message: "Enter year is required!" });  
        
        Student.create(req.body)
            .then(student => {
                res.status(201).json({
                    status: "success",
                    message: "Student was added successfully",
                    student
                });
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while adding Student."
                });
            });
    },

    assignSemesterToStudent: (req, res) => {
        
    },

    editStudent: (req, res) => {
        if (!req.body) {
            return res.status(400).json({
                status: "fail",
                message: "Data to update can not be empty!"
            });
        }

        const { _id } = req.params;
        
        Student.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
            .then(student => {
                if (!student) {
                    res.status(404).json({
                        status: "fail",
                        message: `Cannot update student with id ${_id}. Student was not found`
                    });
                } else {
                    res.status(200).json({
                        status: "success",
                        message: "Student data was updated successfully",
                        student
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while updating student data."
                });
            });
    },

    deleteOneStudent: (req, res) => {
        const { _id } = req.params;

        Student.findByIdAndDelete({ _id })
            .then(student => {
                if (!student) {
                    res.status(404).json({
                        status: "fail",
                        message: `Cannot delete student with id = ${id}. Student was not found!`
                    });
                } else {
                    res.status(200).json({
                        status: "success",
                        message: "Student was deleted successfully!"
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while deleting student data."
                });
            })
    },

    deleteAllStudent: (req, res) => {
        Student.deleteMany({})
            .then(student => {
                res.status(200).json({
                    status: "success",
                    message: `${student.deletedCount} students were deleted successfully!`
                });
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while deleting all Students."
                });
            });
    },

}