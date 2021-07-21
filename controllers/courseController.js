const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
const Score = require('../models/scoreModel');
const Course = require('../models/courseModel');
const Semester = require('../models/semesterModel');

module.exports = {
    
    getAllCourse: (req, res) => {
        Course.find({})
            .then(course => {
                if (!course) {
                    res.status(404).json({
                        status: "success",
                        message: "There is no course data to be found",
                    })
                } else {
                    res.status(200).json({
                        status: "success",
                        course
                    })
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while reading course data."
                });
            })
    },

    searchCourse: (req, res) => {
        Course.find(req.body)
            .then(course => {
                if (!course) {
                    res.status(404).json({
                        status: "success",
                        message: "Course data not found"
                    }); 
                } else {
                    res.status(200).json({
                        status: "success",
                        course
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Error retrieving course data"
                });
            });
    },

    addCourse: (req, res) => {
        const { name, weight } = req.body;

        if (!name) return res.status(400).json({ status: "fail", message: "Name of the course is required!" });
        if (!weight) return res.status(400).json({ status: "fail", message: "Course weight is required!" });

        Course.create(req.body)
            .then(course => {
                res.status(201).json({
                    status: "success",
                    message: "Course data was added successfully",
                    course
                });
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while adding course data."
                });
            })
    },

    assignSemesterToCourse: (req, res) => {
        
    },

    assignStudentToCourse: (req, res) => {
        
    },

    assignScoreToCourse: (req, res) => {
        
    },

    assignTeacherToCourse: (req, res) => {
        
    },

    editCourse: (req, res) => {
        if (!req.body) {
            return res.status(400).json({
                status: "fail",
                message: "Data to update can not be empty!"
            });
        }

        const { _id } = req.params;
        
        Course.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
            .then(course => {
                if (!course) {
                    res.status(404).json({
                        status: "fail",
                        message: `Cannot update course with id ${_id}. Course was not found`
                    });
                } else {
                    res.status(200).json({
                        status: "success",
                        message: "Course data was updated successfully",
                        course
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while updating course data."
                });
            });
    },

    deleteOneCourse: (req, res) => {
        const { _id } = req.params;

        Course.findByIdAndDelete({ _id })
            .then(course => {
                if (!course) {
                    res.status(404).json({
                        status: "fail",
                        message: `Cannot delete course data with id = ${id}. Course data was not found!`
                    });
                } else {
                    res.status(200).json({
                        status: "success",
                        message: "Course data was deleted successfully!"
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while deleting course data"
                });
            })
    },

    deleteAllCourse: (req, res) => {
        Course.deleteMany({})
            .then(course => {
                res.status(200).json({
                    status: "success",
                    message: `${course.deletedCount} courses were deleted successfully!`
                });
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while deleting all courses data"
                });
            });
    },
}