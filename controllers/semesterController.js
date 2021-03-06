const Student = require('../models/studentModel');
const StudentCourse = require('../models/studentCourseModel');
const Semester = require('../models/semesterModel');
const mongoose = require('mongoose');

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

    getSemesterById: async (req, res) => {
        const { _id } = req.params; //semester id

        if (!mongoose.Types.ObjectId.isValid(_id)) { //jika _id tidak valid
            return res.status(400).json({
                status: "fail",
                message: "Id is not valid"
            });           
        }

        try {
            const semester = Semester.findById({ _id });

            if (!semester) {
                return res.status(404).json({
                    status: "fail",
                    message: "Semester data not found"
                }); 
            }

            return res.status(200).json({
                status: "success",
                semester
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                message: error.message || "Error retrieving semester data"
            });
        }
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

    assignNewStudent: async (req, res) => {
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
            const semester = await Semester.findById({ _id });
            const student = await Student.findOne(req.body);

            if (!semester) {
                return res.status(404).json({
                    status: "fail",
                    message: `Semester data was not found`
                }); 
            }

            if (!student) {
                return res.status(404).json({
                    status: "fail",
                    message: `Student data was not found`
                }); 
            }

            await Semester.updateOne({ _id }, { $push: { student: student._id } }, { new: true, useFindAndModify: false })
            const updatedSemester = await Semester.findById({ _id });

            return res.status(200).json({
                status: "success",
                message: `Student with NIM ${student.nim} has been assigned to semester data`,
                semester: updatedSemester
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while updating semester data."
            });
        }    
    },

    unassignStudent: async (req, res) => {
        const { _id } = req.params; //semester

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
            const semester = await Semester.findById({ _id });
            const student = await Student.findOne(req.body);
            
            if (!semester) {
                return res.status(404).json({
                    status: "fail",
                    message: `Cannot unassign student in semester data with id ${_id}. Semester data was not found`
                });            
            }

            if (!student) {
                return res.status(404).json({
                    status: "fail",
                    message: `Student data was not found`
                });            
            }
            
            await Semester.updateOne({ _id }, { $pull: { student: student._id } }, { new: true, useFindAndModify: false });
            const updatedSemester = await Semester.findById({ _id });

            return res.status(200).json({
                status: "success",
                message: `Student with NIM ${student.nim} has been unassigned from semester data`,
                semester: updatedSemester
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while updating semester data."
            });
        }
    },
    
    editSemester: (req, res) => {
        const { _id } = req.params;

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

        Semester.findByIdAndUpdate({_id }, req.body, { useFindAndModify: false })
            .then(async semester => {
                const updatedData = await Semester.findById({ _id });
                
                if (!semester) {
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

        if (!mongoose.Types.ObjectId.isValid(_id)) { //jika _id tidak valid
            return res.status(400).json({
                status: "fail",
                message: "Id is not valid"
            });           
        }

        try {
            const semester = await Semester.findById({ _id });

            if (!semester) {
                return res.status(404).json({
                    status: "fail",
                    message: `Cannot delete semester data with id ${_id}. Semester data was not found`
                });            
            }

            semester.remove();
            return res.status(200).json({
                status: "success",
                message: "Semester data was deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while deleting semester data."
            });
        }
    },
    
    deleteAllSemester: async (req, res) => {
        try {
            const semester = Semester.find({});

            if (!semester) {
                return res.status(404).json({
                    status: "fail",
                    message: "There is no semester data to be found"
                });               
            }

            await Semester.deleteMany({});
            return res.status(200).json({
                status: "success",
                message: "All semester data was deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while deleting all semester data."
            });
        }
    }
}