const Exam = require("../models/exam");

class examController {
    static getExam = async (req, res) => {
        const examId = req.params.id;
        try {
            const exam = await Exam.findById(examId);

            if (!exam) {
                return res.status(404).json({ message: 'Exam not found' });
            }

            res.status(200).json({ exam });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static EditExam = async (req, res) => {
        const examId = req.params.id;
        try {
            // Find the exam by ID
            let exam = await Exam.findById(examId);

            if (!exam) {
                // If the exam is not found, return a 404 error
                return res.status(404).json({ message: 'Exam not found' });
            }

            // Update exam details based on the request body
            if (req.body.examName) {
                exam.examName = req.body.examName;
            }

            if (req.body.questions && Array.isArray(req.body.questions)) {
                // Iterate through questions in the request body
                for (const updatedQuestion of req.body.questions) {
                    const existingQuestion = exam.questions.find(q => q._id == updatedQuestion._id);

                    if (existingQuestion) {
                        // Update existing question
                        existingQuestion.questionContent = updatedQuestion.questionContent;

                        // Update options for the existing question
                        if (updatedQuestion.options && Array.isArray(updatedQuestion.options)) {
                            existingQuestion.options = updatedQuestion.options;
                        }
                    } else {
                        // Add a new question if it doesn't exist in the current exam
                        exam.questions.push(updatedQuestion);
                    }
                }
            }

            // Save the updated exam
            exam = await exam.save();

            return res.status(200).json({
                message: 'Exam updated successfully',
                exam
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

}


module.exports = examController;