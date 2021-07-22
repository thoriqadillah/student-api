const Score = require('../models/scoreModel');
const Course = require('../models/courseModel');

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

        const { category } = req.body;
        
        //jika salah satu filed pada req.body kosong
        if (!category) return res.status(400).json({ status: "fail", message: "Score category is required!" });

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

    assignNewCourseToScore: (req, res) => {
        
    },

    editScore: (req, res) => {
        //jika req.body kosong
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Data to update can not be empty!"
            });
        }
        
        const { _id } = req.params;
        
        Score.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
            .then(async score => {
                const updatedData = await Score.findById({ _id });

                if (!score.length) { //jika data kosong
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

    deleteOneScore: (req, res) => {
        const { _id } = req.params;

        Score.findByIdAndDelete({ _id })
            .then(score => {
                if (!score.length) { //jika data kosong
                    res.status(404).json({
                        status: "fail",
                        message: `Cannot delete score data with id = ${id}. Score data was not found!`
                    });
                } else {
                    res.status(200).json({
                        status: "success",
                        message: "Score data was deleted successfully!"
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message || "Some error occurred while deleting score data"
                });
            })
    },

    // deleteAllScore: (req, res) => {
    //     Score.deleteMany({})
    //         .then(score => {
    //             res.status(200).json({
    //                 status: "success",
    //                 message: `${score.deletedCount} scores were deleted successfully!`
    //             });
    //         })
    //         .catch(error => {
    //             res.status(500).json({
    //                 status: "fail",
    //                 message: error.message || "Some error occurred while deleting all scores data"
    //             });
    //         });
    // },
}