const Teacher = require('../models/teacherModel');
const Course = require('../models/courseModel');
const mongoose = require('mongoose');

module.exports = {
    
    getAllTeacher: (req, res) => {
        Teacher.find({})
            .then(teacher => {
                if (!teacher.length) { //jika data kosong
                    res.status(404).json({
                        status: "fail",
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
        //jika req.body kosong
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to insert can not be empty!"
            });
        }
        
        Teacher.find(req.body)
            .then(teacher => {
                if (!teacher.length) { //jika data kosong
                    res.status(404).json({
                        status: "fail",
                        message: "Teacher data was not found"
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

    addTeacher: async (req, res) => {
        //jika req.body kosong
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to insert can not be empty!"
            });
        }

        const { nip, name, email } = req.body;

        //jika salah satu filed pada req.body kosong
        if (!nip) return res.status(400).json({ status: "fail", message: "Teacher NIP is required!" });
        if (!name) return res.status(400).json({ status: "fail", message: "Teacher name is required!" });
        if (!email) return res.status(400).json({ status: "fail", message: "Teacher email is required!" });

        try {
            const teacherNIM = await Teacher.exists({ nip });
            const teacherEmail = await Teacher.exists({ email });

            if (teacherNIM) {
                return res.status(400).json({
                    status: "fail",
                    message: `Teacher with NIP ${nip} is already existed`,
                });
            }

            if (teacherEmail) {
                return res.status(400).json({
                    status: "fail",
                    message: `Teacher with email ${email} is already existed`,
                });
            }
            
            await Teacher.create(req.body, (err, data) => {
                return res.status(201).json({
                    status: "success",
                    message: "Teacher was added successfully",
                    student: data
                });
            });

        } catch (error) {
            return res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while adding student data"
            });
        }
    },

    assignNewCourseToTeacher: async (req, res) => {
        const { _id } = req.params; //teacher id

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
            const teacher = await Teacher.findById({ _id });
            const course = await Course.findOne(req.body);

            if (!teacher) {
                return res.status(404).json({
                    status: "fail",
                    message: `Teacher data was not found`
                }); 
            }

            if (!course) {
                return res.status(404).json({
                    status: "fail",
                    message: `Course data was not found`
                }); 
            }

            await Teacher.updateOne({ _id }, { $push: { course: course._id } }, { new: true, useFindAndModify: false });
            const populatedTeacher = await Teacher.findById({ _id }).populate('course');

            return res.status(200).json({
                status: "success",
                message: "Teacher data was updated successfully",
                teacher: populatedTeacher
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while updating teacher data."
            });
        }
    },

    editTeacher: (req, res) => {
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
        
        Teacher.findByIdAndUpdate({ _id }, req.body, { useFindAndModify: false })
            .then(async teacher => {
                const updatedData = await Teacher.findById({ _id });
                
                if (!teacher) { //jika data kosong
                    res.status(404).json({
                        status: "fail",
                        message: `Cannot update teacher data with id ${_id}. Teacher data was not found`
                    });
                } else {
                    res.status(200).json({
                        status: "success",
                        message: "Teacher data was updated successfully",
                        teacher: updatedData //tampilkan data yang sudah diupdate
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

    deleteOneTeacher: async (req, res) => {
        const { _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) { //jika _id tidak valid
            return res.status(400).json({
                status: "fail",
                message: "Id is not valid"
            });           
        }

        try {
            const teacher = await Teacher.findById({ _id });

            if (!teacher) {
                return res.status(404).json({
                    status: "fail",
                    message: `Cannot delete teacher data with id ${_id}. Teacher data was not found`
                });            
            }

            await Course.updateMany({}, { $pull: { teacher: teacher._id } }, { new: true, useFindAndModify: false })
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