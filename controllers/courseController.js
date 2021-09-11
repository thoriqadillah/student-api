const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
const Score = require('../models/scoreModel');
const Course = require('../models/courseModel');
const Semester = require('../models/semesterModel');
const mongoose = require('mongoose');

module.exports = {
    
    getAllCourse: (req, res) => {
        Course.find({})
            .then(course => {
                if (!course.length) { //jika data kosong
                    res.status(404).json({
                        status: "fail",
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

    getCourseById: async (req, res) => {
        const { _id } = req.params; //semester id
        if (mongoose.Types.Ob)

        if (!mongoose.Types.ObjectId.isValid(_id)) { //jika _id tidak valid
            return res.status(400).json({
                status: "fail",
                message: "Id is not valid"
            });           
        }

        try {
            const course = Course.findById({ _id });

            if (!course) {
                return res.status(404).json({
                    status: "fail",
                    message: "Course data not found"
                }); 
            }

            return res.status(200).json({
                status: "success",
                course
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                message: error.message || "Error retrieving course data"
            });
        }
    },

    searchCourse: (req, res) => {
        //jika req.body kosong
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to insert can not be empty!"
            });
        }
        
        Course.find(req.body)
            .then(course => {
                if (!course.length) { //jika data kosong
                    res.status(404).json({
                        status: "fail",
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

    addCourse: async (req, res) => {
        //jika req.body kosong
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to insert can not be empty!"
            });
        }

        const { name, weight } = req.body;
 
        //jika salah satu filed pada req.body kosong
        if (!name) return res.status(400).json({ status: "fail", message: "Name of the course is required!" });
        if (!weight) return res.status(400).json({ status: "fail", message: "Course weight is required!" });

        try {
            const course = await Course.exists({ name })

            if (course) {
                return res.status(400).json({
                    status: "fail",
                    message: `${name} is already exist`,
                });
            }
            
            await Course.create(req.body, (err, data) => {
                return res.status(201).json({
                    status: "success",
                    message: `${name} was added successfully`,
                    course: data
                });
            });

        } catch (error) {
            return res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while adding teacher data"
            });
        }
    },

    assignNewTeacher: async (req, res) => {
        const { _id } = req.params; //semester id

        if (!mongoose.Types.ObjectId.isValid(_id)) { //jika _id tidak valid
            return res.status(400).json({
                status: "fail",
                message: "Id is not valid"
            });           
        }
    
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to update can not be empty!"
            });
        }

        try {
            const course = await Course.findById({ _id });
            const teacher = await Teacher.findOne(req.body);

            if (!course) {
                return res.status(404).json({
                    status: "fail",
                    message: `Course data was not found`
                }); 
            }

            if (!teacher) {
                return res.status(404).json({
                    status: "fail",
                    message: `Teacher data was not found`
                }); 
            }

            await Course.updateOne({ _id }, { $push: { teacher: teacher._id } }, { new: true, useFindAndModify: false })
            const updatedCourse = await Course.findById({ _id });

            return res.status(200).json({
                status: "success",
                message: `Teacher with NIP ${teacher.nip} has been assigned to course data`,
                course: updatedCourse
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while updating course data."
            });
        }   
    },

    unassignTeacher: async (req, res) => {
        const { _id } = req.params; //semester id

        if (!mongoose.Types.ObjectId.isValid(_id)) { //jika _id tidak valid
            return res.status(400).json({
                status: "fail",
                message: "Id is not valid"
            });           
        }
    
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to update can not be empty!"
            });
        }

        try {
            const course = await Course.findById({ _id });
            const teacher = await Teacher.findOne(req.body);

            if (!course) {
                return res.status(404).json({
                    status: "fail",
                    message: `Course data was not found`
                }); 
            }

            if (!teacher) {
                return res.status(404).json({
                    status: "fail",
                    message: `Teacher data was not found`
                }); 
            }

            await Course.updateOne({ _id }, { $pull: { teacher: teacher._id } }, { new: true, useFindAndModify: false })
            const updatedCourse = await Course.findById({ _id });

            return res.status(200).json({
                status: "success",
                message: `Teacher with NIP ${teacher.nip} has been unassigned from course data`,
                course: updatedCourse
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while updating course data."
            });
        }  
    },

    editCourse: (req, res) => {
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
        
        Course.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
            .then(async course => {
                const updatedData = await Course.findById({ _id });

                if (!course.length) { //jika data kosong
                    res.status(404).json({
                        status: "fail",
                        message: `Cannot update course data with id ${_id}. Course data was not found`
                    });
                } else {
                    res.status(200).json({
                        status: "success",
                        message: "Course data was updated successfully",
                        course: updatedData //tampilkan data yang sudah diupdate
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

    deleteOneCourse: async (req, res) => {
        const { _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) { //jika _id tidak valid
            return res.status(400).json({
                status: "fail",
                message: "Id is not valid"
            });           
        }

        try {
            const course = await Course.findById({ _id });
            
            if (!course) {
                return res.status(404).json({
                    status: "fail",
                    message: `Cannot delete course data with id ${_id}. Course data was not found`
                });            
            }

            course.remove();
            return res.status(200).json({
                status: "success",
                message: "Course data was deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while deleting course data."
            });
        }
    },

    deleteAllCourse: async (req, res) => {
        try {
            const course = Course.find({});

            if (!course) {
                return res.status(404).json({
                    status: "fail",
                    message: "There is no course data to be found"
                });               
            }

            await Course.deleteMany({});
            return res.status(200).json({
                status: "success",
                message: "All course data was deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while deleting all course data."
            });
        }
    }
}