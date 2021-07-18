const Student = require('../models/student');

module.exports = {

    getAllStudent: (req, res) => {
        Student.find({})
            .then(student => {
                if (!student) {
                    res.status(404).json({
                        message: "Student not found"
                    });
                } else {
                    res.status(200).json(student);
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: err.message || "Some error occurred while reading student data."
                });
            });
    },
    
    getOneStudent: (req, res) => {
        const { _id } = req.params;

        Student.find({ _id })
            .then(student => {
                if (!student) {
                    res.status(404).json({
                        message: "Student not found"
                    }); 
                } else {
                    res.status(200).json(student);
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: "Error retrieving student with id = " + _id
                });
            });
    },

    addStudent: (req, res) => {
        const { nim, name, email, phone, major } = req.body;

        if (!nim) return res.status(400).json({ message: "NIM is required!" });
        if (!name) return res.status(400).json({ message: "Name is required!" });
        if (!email) return res.status(400).json({ message: "Email is required!" });
        if (!major) return res.status(400).json({ message: "Major is required!" });  

        const student = new Student({
            nim, name, email, phone, major
        });

        student.save(student)
            .then(data => {
                res.status(201).json(newStudent);
            })
            .catch(error => {
                res.status(500).json({
                    message: err.message || "Some error occurred while adding Student."
                });
            });
    },

    editStudent: (req, res) => {
        if (!req.body) {
            return res.status(400).json({
                message: "Data to update can not be empty!"
            });
        }

        const { _id } = req.params;
        
        Student.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
            .then(student => {
                if (!student) {
                    res.status(404).json({
                        message: `Cannot update student with id ${_id}. Student was not found`
                    });
                } else {
                    res.json({ message: "Student data was updated successfully." });
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: err.message || "Some error occurred while updating student data."
                });
            });
    },

    deleteOneStudent: (req, res) => {
        const { _id } = req.params;

        Student.findByIdAndDelete({ _id })
            .then(student => {
                if (!data) {
                    res.status(404).json({
                        message: `Cannot delete student with id = ${id}. Student was not found!`
                    });
                } else {
                    res.json({
                        message: "Student was deleted successfully!"
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: err.message || "Some error occurred while deleting student data."
                });
            })
    },

    deleteAllStudent: (req, res) => {
        Student.deleteMany({})
            .then(student => {
                res.json({
                    message: `${student.deletedCount} students were deleted successfully!`
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: error.message || "Some error occurred while deleting all Students."
                });
            });
    }
}