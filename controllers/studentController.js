const Student = require('../models/studentModel');
const Semester = require('../models/semesterModel');


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

    addStudent: (req, res) => {
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
                    message: error.message || "Some error occurred while adding student data"
                });
            });
    },

    assignNewSemesterToStudent: (req, res) => {
        const { _id } = req.params; //student id
        
        //jika req.body kosong
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to update can not be empty!"
            });
        }

        Semester.findOne(req.body)
            .then(semester => {
                if (!semester.length) { //jika data kosong
                    return res.status(404).json({
                        status: "fail",
                        message: `Semester data was not found`
                    });   
                }
                //jika data tidak kosong, maka ref dari semester dimasukkan ke dalam filed semester pada document student
                return Student.findByIdAndUpdate(_id, { $push: { semester: semester._id } }, { new: true, useFindAndModify: false })
                    .then(student => {
                        if (!student.length) { //jika data kosong
                            res.status(404).json({
                                status: "fail",
                                message: `Cannot update student with id = ${_id}. Student data was not found`
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
                    })
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while updating student data."
                });
            })
    },

    editStudent: (req, res) => {
        //jika req.body kosong
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to update can not be empty!"
            });
        }
        
        const { _id } = req.params;
        
        Student.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
            .then(async student => {
                const updatedData = await Student.findById({ _id });

                if (!student.length) { //jika data kosong
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
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while updating student data."
                });
            });
    },

    deleteOneStudent: async (req, res) => {
        const { _id } = req.params;
        
        const student = await Student.findById({ _id });
        await Student.exists({ _id }, async (err, data) => {
            if (data) {
                if (err) {
                    res.status(500).json({
                        status: "fail",
                        message: error.message || "Some error occurred while deleting students data"
                    });   
                }

                //menghapus ref student dari semester setelah student dihapus
                await Semester.updateMany({ '_id': student.semester }, { $pull: { student: student._id } }, { new: true, useFindAndModify: false });
                await student.remove();
                
                return res.status(200).json({
                    status: "success",
                    message: `Student data with _id = ${student._id} was deleted successfully`,
                });

            } else {
                return res.status(404).json({
                    status: "fail",
                    message: `Cannot update student with id ${_id}. Student data was not found`
                });
            }
        });
    },

    // deleteAllStudent: async (req, res) => {
    //     Student.deleteMany({})
    //         .then(student => {
    //             Semester.updateMany({ '_id': student.semester }, { $pull: { student: student._id } }, { new: true, useFindAndModify: false })
    //                 .then(semester => {
    //                     res.status(200).json({
    //                         status: "success",
    //                         message: `${student.deletedCount} students were deleted successfully!`
    //                     });

    //                 });
    //         })
    //         .catch(error => {
    //             res.status(500).json({
    //                 status: "fail",
    //                 message: error.message || "Some error occurred while deleting all Students."
    //             });
    //         });
    // },

}