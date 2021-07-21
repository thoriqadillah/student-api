const Student = require('../models/studentModel');
const Course = require('../models/courseModel');
const Semester = require('../models/semesterModel');

module.exports = {
    
    getAllSemester: (req, res) => {
        Semester.find({})
            .then(semester => {
                if (!semester) {
                    res.json({
                        status: "success",
                        message: "There is no semester data to be found",
                    })
                } else {
                    res.json({
                        status: "success",
                        semester
                    })
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while reading semester data."
                });
            })
    },

    getOneSemester: (req, res) => {
        const { _id } = req.params;

        Semester.findById({ _id })
            .then(semester => {
                if (!semester) {
                    res.status(404).json({
                        status: "success",
                        message: "Semester data not found"
                    }); 
                } else {
                    res.status(200).json({
                        status: "success",
                        semester
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Error retrieving semester data with id = " + _id
                });
            });
    },

    searchSemester: (req, res) => {
        Semester.find(req.body)
            .then(semester => {
                if (!semester) {
                    res.status(404).json({
                        status: "success",
                        message: "Semester data not found"
                    }); 
                } else {
                    res.status(200).json({
                        status: "success",
                        semester
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Error retrieving semester data"
                });
            });
    },

    addSemester: (req, res) => {
        const { semester, year } = req.body;

        if (!semester) return res.status(400).json({ status: "fail", message: "Semester number is required!" });
        if (!year) return res.status(400).json({ status: "fail", message: "Semester year is required!" });

        Semester.create(req.body)
            .then(semester => {
                res.status(201).json({
                    status: "success",
                    message: "Semester data was added successfully",
                    semester
                });
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while adding semester data."
                });
            })
    },

    assignStudentToSemester: async (req, res) => {
        
    },

    editSemester: (req, res) => {
        if (!req.body) {
            return res.status(400).json({
                status: "fail",
                message: "Data to update can not be empty!"
            });
        }

        const { _id } = req.params;
        
        Semester.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
            .then(semester => {
                if (!semester) {
                    res.status(404).json({
                        status: "fail",
                        message: `Cannot update semester with id ${_id}. Semester was not found`
                    });
                } else {
                    res.json({
                        status: "success",
                        message: "Student data was updated successfully",
                        student
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while updating semester data."
                });
            });
    },

    deleteOneSemester: (req, res) => {
        const { _id } = req.params;

        Semester.findByIdAndDelete({ _id })
            .then(semester => {
                if (!semester) {
                    res.status(404).json({
                        status: "fail",
                        message: `Cannot delete semester data with id = ${id}. Semester data was not found!`
                    });
                } else {
                    res.json({
                        status: "success",
                        message: "Semester data was deleted successfully!"
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while deleting semester data"
                });
            })
    },

    deleteAllSemester: (req, res) => {
        Semester.deleteMany({})
            .then(semester => {
                res.status(200).json({
                    status: "success",
                    message: `${semester.deletedCount} semesters were deleted successfully!`
                });
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while deleting all semesters data"
                });
            });
    },
}