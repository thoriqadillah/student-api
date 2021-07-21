const Teacher = require('../models/teacherModel');
const Course = require('../models/courseModel');

module.exports = {
    
    getAllTeacher: (req, res) => {
        Teacher.find({})
            .then(teacher => {
                if (!teacher) {
                    res.status(404).json({
                        status: "success",
                        message: "There is no teacher data to be found",
                    })
                } else {
                    res.status(200).json({
                        status: "success",
                        teacher
                    })
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while reading teacher data."
                });
            })
    },

    searchTeacher: (req, res) => {
        Teacher.find(req.body)
            .then(teacher => {
                if (!teacher) {
                    res.status(404).json({
                        status: "success",
                        message: "Teacher data not found"
                    }); 
                } else {
                    res.status(200).json({
                        status: "success",
                        teacher
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Error retrieving teacher data"
                });
            });
    },

    addTeacher: (req, res) => {
        const { nip, name, email } = req.body;

        if (!nip) return res.status(400).json({ status: "fail", message: "Teacher NIP is required!" });
        if (!name) return res.status(400).json({ status: "fail", message: "Teacher name is required!" });
        if (!email) return res.status(400).json({ status: "fail", message: "Teacher email is required!" });

        Teacher.create(req.body)
            .then(teacher => {
                res.status(201).json({
                    status: "success",
                    message: "Teacher data was added successfully",
                    teacher
                });
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while adding teacher data."
                });
            })
    },

    assignCourseToTeacher: (req, res) => {
        
    },

    editTeacher: (req, res) => {
        if (!req.body) {
            return res.status(400).json({
                status: "fail",
                message: "Data to update can not be empty!"
            });
        }

        const { _id } = req.params;
        
        Teacher.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
            .then(teacher => {
                if (!teacher) {
                    res.status(404).json({
                        status: "fail",
                        message: `Cannot update teacher with id ${_id}. Teacher was not found`
                    });
                } else {
                    res.status(200).json({
                        status: "success",
                        message: "Teacher data was updated successfully",
                        teacher
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while updating teacher data."
                });
            });
    },

    deleteOneTeacher: (req, res) => {
        const { _id } = req.params;

        Teacher.findByIdAndDelete({ _id })
            .then(teacher => {
                if (!teacher) {
                    res.status(404).json({
                        status: "fail",
                        message: `Cannot delete teacher data with id = ${id}. Teacher data was not found!`
                    });
                } else {
                    res.status(200).json({
                        status: "success",
                        message: "Teacher data was deleted successfully!"
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while deleting teacher data"
                });
            })
    },

    deleteAllTeacher: (req, res) => {
        Teacher.deleteMany({})
            .then(teacher => {
                res.status(200).json({
                    status: "success",
                    message: `${teacher.deletedCount} teachers were deleted successfully!`
                });
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while deleting all teachers data"
                });
            });
    },
}