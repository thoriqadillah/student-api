const Student = require('../models/studentModel');
const Course = require('../models/courseModel');
const Semester = require('../models/semesterModel');

module.exports = {
    
    getAllSemester: (req, res) => {
        Semester.find({})
            .then(semester => {
                if (!semester) {
                    res.status(404).json({
                        status: "fail",
                        message: "There is no semester data to be found",
                    })
                } else {
                    res.status(200).json({
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

    searchSemester: (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to insert can not be empty!"
            });
        }
        
        Semester.find(req.body)
            .then(semester => {
                if (!semester.length) {
                    res.status(404).json({
                        status: "fail",
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
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to insert can not be empty!"
            });
        }

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

    assignNewStudentToSemester: async (req, res) => {
        const { _id } = req.params; //semester id
    
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to update can not be empty!"
            });
        }

        Student.findOne(req.body)
            .then(student => {
                if (!student.length) {
                    return res.status(404).json({
                        status: "fail",
                        message: `Student data was not found`
                    });   
                }
                return Semester.findByIdAndUpdate(_id, { $push: { student: student._id } }, { new: true, useFindAndModify: false })
                    .then(semester => {
                        if (!semester.length) {
                            res.status(404).json({
                                status: "fail",
                                message: `Cannot update semester data with id ${_id}. Semester was not found`
                            });    
                        } else {
                            res.status(200).json({
                                status: "success",
                                message: "Semester data was updated successfully",
                                semester
                            });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({
                            status: "fail",
                            message: error.message || "Some error occurred while updating semester data."
                        });
                    })
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while updating student data."
                });
            })
    },

    assignNewCourseToSemester: async (req, res) => {
        const { _id } = req.params; //semester id
    
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to update can not be empty!"
            });
        }

        Course.findOne(req.body)
            .then(course => {
                if (!course.length) {
                    return res.status(404).json({
                        status: "fail",
                        message: `Course data was not found`
                    });   
                }
                return Semester.findByIdAndUpdate(_id, { $push: { course: course._id } }, { new: true, useFindAndModify: false })
                    .then(semester => {
                        if (!semester.length) {
                            res.status(404).json({
                                status: "fail",
                                message: `Cannot update semester data with id ${_id}. Semester data was not found`
                            });    
                        } else {
                            res.status(200).json({
                                status: "success",
                                message: "Semester data was updated successfully",
                                semester
                            });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({
                            status: "fail",
                            message: error.message || "Some error occurred while updating semester data."
                        });
                    })
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while updating student data."
                });
            })
    },

    editSemester: (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to update can not be empty!"
            });
        }

        const { _id } = req.params;
        
        Semester.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
            .then(async semester => {
                const updatedData = await Semester.findById({ _id });
                
                if (!semester.length) {
                    res.status(404).json({
                        status: "fail",
                        message: `Cannot update semester with id ${_id}. Semester data was not found`
                    });
                } else {
                    res.status(200).json({
                        status: "success",
                        message: "Semester data was updated successfully",
                        semester: updatedData //tampilkan data yang sudah diupdate
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

    deleteOneSemester: async (req, res) => {
        const { _id } = req.params;
        
        const semester = await Semester.findById({ _id });
        await Semester.exists({ _id }, async (err, data) => {
            if (data) {
                if (err) {
                    return res.status(500).json({
                        status: "fail",
                        message: error.message || "Some error occurred while deleting semester data"
                    });   
                }

                //menghapus ref student dari semester setelah student dihapus
                await Student.updateMany({ '_id': semester.student }, { $pull: { student: semester._id } }, { new: true, useFindAndModify: false });
                await Course.updateMany({ '_id': semester.course }, { $pull: { course: semester._id } }, { new: true, useFindAndModify: false });
                await semester.remove();

                return res.status(200).json({
                    status: "success",
                    message: `Semester data with _id = ${semester._id} was deleted successfully`,
                });

            } else {
                return res.status(404).json({
                    status: "fail",
                    message: `Cannot update semester with id ${_id}. Semester data was not found`
                });
            }
        });
    },

    // deleteAllSemester: (req, res) => {
    //     Semester.deleteMany({})
    //         .then(semester => {
    //             res.status(200).json({
    //                 status: "success",
    //                 message: `${semester.deletedCount} semesters were deleted successfully!`
    //             });
    //         })
    //         .catch(error => {
    //             res.status(500).json({
    //                 status: "fail",
    //                 message: error.message || "Some error occurred while deleting all semesters data"
    //             });
    //         });
    // },
}