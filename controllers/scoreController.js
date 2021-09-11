const Score = require('../models/scoreModel');
const StudentCourse = require('../models/studentCourseModel');
const mongoose = require('mongoose');

module.exports = {
    
    getAllScore: (req, res) => {
        Score.find({})
            .then(score => {
                if (!score.length) { //jika data kosong
                    res.status(404).json({
                        status: "fail",
                        message: "There is no score data to be found",
                    })
                } else {
                    res.status(200).json({
                        status: "success",
                        score
                    })
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while reading score data."
                });
            })
    },

    getScoreById: async (req, res) => {
        const { _id } = req.params; //semester id

        if (!mongoose.Types.ObjectId.isValid(_id)) { //jika _id tidak valid
            return res.status(400).json({
                status: "fail",
                message: "Id is not valid"
            });           
        }

        try {
            const score = Score.findById({ _id });

            if (!score) {
                return res.status(404).json({
                    status: "fail",
                    message: "Score data not found"
                }); 
            }

            return res.status(200).json({
                status: "success",
                score
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                message: error.message || "Error retrieving score data"
            });
        }
    },

    searchScore: (req, res) => {
        //jika req.body kosong
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to insert can not be empty!"
            });
        }
        
        Score.find(req.body)
            .then(score => {
                if (!score.length) { //jika data kosong
                    res.status(404).json({
                        status: "fail",
                        message: "Score data not found"
                    }); 
                } else {
                    res.status(200).json({
                        status: "success",
                        score
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Error retrieving score data"
                });
            });
    },

    addScore: (req, res) => {
        //jika req.body kosong
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to insert can not be empty!"
            });
        }

        const { category, score } = req.body;
        
        //jika salah satu filed pada req.body kosong
        if (!category) return res.status(400).json({ status: "fail", message: "Score category is required!" });
        if (!score) return res.status(400).json({ status: "fail", message: "Score is required!" });

        Score.create(req.body)
            .then(score => {
                res.status(201).json({
                    status: "success",
                    message: "Score data was added successfully",
                    score
                });
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while adding score data."
                });
            })
    },

    assignNewCourse: async (req, res) => {
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
            const score = await Score.findById({ _id });
            const course = await StudentCourse.findOne(req.body);

            if (!score) {
                return res.status(404).json({
                    status: "fail",
                    message: `Score data was not found`
                }); 
            }

            if (!course) {
                return res.status(404).json({
                    status: "fail",
                    message: `Course data was not found`
                }); 
            }

            await Score.updateOne({ _id }, { $push: { course: course._id } }, { new: true, useFindAndModify: false });
            const updatedScore = await Score.findById({ _id });

            return res.status(200).json({
                status: "success",
                message: `${course.name} has been assigned to score data`,
                score: updatedScore
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while updating score data."
            });
        }
    },

    unassignCourse: async (req, res) => {
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
            const score = await Score.findById({ _id });
            const course = await StudentCourse.findOne(req.body);

            if (!score) {
                return res.status(404).json({
                    status: "fail",
                    message: `Score data was not found`
                }); 
            }

            if (!course) {
                return res.status(404).json({
                    status: "fail",
                    message: `Course data was not found`
                }); 
            }

            await Score.updateOne({ _id }, { $pull: { course: course._id } }, { new: true, useFindAndModify: false });
            const updatedScore = await Score.findById({ _id });

            return res.status(200).json({
                status: "success",
                message: `${course.name} has been unassigned from score data`,
                score: updatedScore
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while updating score data."
            });
        }
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
            const score = await Score.findById({ _id });
            const student = await Student.findOne(req.body);

            if (!score) {
                return res.status(404).json({
                    status: "fail",
                    message: `Score data was not found`
                }); 
            }

            if (!student) {
                return res.status(404).json({
                    status: "fail",
                    message: `Student data was not found`
                }); 
            }

            await Score.updateOne({ _id }, { $push: { student: student._id } }, { new: true, useFindAndModify: false })
            const updatedScore = await Score.findById({ _id });

            return res.status(200).json({
                status: "success",
                message: `Student with NIM ${student.nim} has been assigned to score data`,
                score: updatedScore
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while updating score data."
            });
        }   
    },

    unassignStudent: async (req, res) => {
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
            const score = await Score.findById({ _id });
            const student = await Student.findOne(req.body);

            if (!score) {
                return res.status(404).json({
                    status: "fail",
                    message: `Score data was not found`
                }); 
            }

            if (!student) {
                return res.status(404).json({
                    status: "fail",
                    message: `Student data was not found`
                }); 
            }

            await Score.updateOne({ _id }, { $pull: { student: student._id } }, { new: true, useFindAndModify: false })
            const updatedScore = await Score.findById({ _id });

            return res.status(200).json({
                status: "success",
                message: `Student with NIM ${student.nim} has been unassigned from score data`,
                score: updatedScore
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while updating score data."
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
            const score = await Score.findById({ _id });
            const teacher = await Teacher.findOne(req.body);

            if (!score) {
                return res.status(404).json({
                    status: "fail",
                    message: `Score data was not found`
                }); 
            }

            if (!teacher) {
                return res.status(404).json({
                    status: "fail",
                    message: `Teacher data was not found`
                }); 
            }

            await Score.updateOne({ _id }, { $push: { teacher: teacher._id } }, { new: true, useFindAndModify: false })
            const updatedScore = await Score.findById({ _id });

            return res.status(200).json({
                status: "success",
                message: `Teacher with NIP ${teacher.nip} has been assigned to score data`,
                score: updatedScore
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while updating score data."
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
            const score = await Score.findById({ _id });
            const teacher = await Teacher.findOne(req.body);

            if (!score) {
                return res.status(404).json({
                    status: "fail",
                    message: `Score data was not found`
                }); 
            }

            if (!teacher) {
                return res.status(404).json({
                    status: "fail",
                    message: `Teacher data was not found`
                }); 
            }

            await Score.updateOne({ _id }, { $pull: { teacher: teacher._id } }, { new: true, useFindAndModify: false })
            const updatedScore = await Score.findById({ _id });

            return res.status(200).json({
                status: "success",
                message: `Teacher with NIP ${teacher.nip} has been unassigned from score data`,
                score: updatedScore
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while updating score data."
            });
        }  
    },

    
    editScore: (req, res) => {
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
        
        Score.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
            .then(async score => {
                const updatedData = await Score.findById({ _id });

                if (!score) { //jika data kosong
                    res.status(404).json({
                        status: "fail",
                        message: `Cannot update score data with id ${_id}. Score was not found`
                    });
                } else {
                    res.status(200).json({
                        status: "success",
                        message: "Score data was updated successfully",
                        score: updatedData //tampilkan data yang sudah diupdate
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while updating score data."
                });
            });
    },

    deleteOneScore: async  (req, res) => {
        const { _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) { //jika _id tidak valid
            return res.status(400).json({
                status: "fail",
                message: "Id is not valid"
            });           
        }

        try {
            const score = await Score.findById({ _id });
            
            if (!score) {
                return res.status(404).json({
                    status: "fail",
                    message: `Cannot delete score data with id ${_id}. Score data was not found`
                });            
            }

            score.remove();
            return res.status(200).json({
                status: "success",
                message: "Score data was deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while deleting score data."
            });
        }
    },

    deleteAllScore: async (req, res) => {
        try {
            const score = Score.find({});

            if (!score) {
                return res.status(404).json({
                    status: "fail",
                    message: "There is no score data to be found"
                });               
            }

            await Score.deleteMany({});
            return res.status(200).json({
                status: "success",
                message: "All score data was deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                message: error.message || "Some error occurred while deleting all score data."
            });
        }
    }
}