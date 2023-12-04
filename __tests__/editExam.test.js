const app = require('../server');
const request = require('supertest');
const mongoose = require('mongoose');

afterAll(async () => {
    await mongoose.connection.close();
});


describe("editExam", () => {
    test("Should return the exam name after updated", async () => {
        const createNewExam = await request(app)
            .post('/exams')
            .send({
                examName: "Math",
                questions: [
                    {
                        questionContent: "3 - 2 = ?",
                        options: [
                            {
                                option: "2",
                                isCorrect: false
                            },
                            {
                                option: "3",
                                isCorrect: false
                            },
                            {
                                option: "1",
                                isCorrect: true
                            },
                        ]
                    }
                ]
            })

        expect(createNewExam.statusCode).toEqual(201)
        expect(createNewExam.body.exam.examName).toBe("Math")

        const examId = createNewExam.body.exam._id;
        const res = await request(app)
            .put(`/exams/${examId}`)
            .send({
                examName: "Bài thi mẫu",
            })

        expect(res.statusCode).toEqual(200)
        expect(res.body.exam.examName).toBe("Bài thi mẫu")
    }, 9999)

    test("Change questionContent and options", async () => {
        const createNewExam = await request(app)
            .post('/exams')
            .send({
                examName: "Math 2",
                questions: [
                    {
                        questionContent: "3 - 1 + 2 = ?",
                        options: [
                            {
                                option: "2",
                                isCorrect: false
                            },
                            {
                                option: "4",
                                isCorrect: true
                            },
                            {
                                option: "6",
                                isCorrect: false
                            },
                        ]
                    }
                ]
            })

        expect(createNewExam.statusCode).toEqual(201)
        expect(createNewExam.body.exam.examName).toBe("Math 2")

        const examId = createNewExam.body.exam._id;
        const questionId = createNewExam.body.exam.questions[0]._id
        const res = await request(app)
            .put(`/exams/${examId}`)
            .send({
                questions: [
                    {
                        _id: questionId,
                        questionContent: "2 + 1 - 3 = ?",
                        options: [
                            {
                                option: "0",
                                isCorrect: true
                            },
                            {
                                option: "1",
                                isCorrect: false
                            },
                            {
                                option: "2",
                                isCorrect: false
                            },
                            {
                                option: "3",
                                isCorrect: false
                            },
                        ]
                    }
                ]
            })

        expect(res.statusCode).toEqual(200)
        expect(res.body.exam.questions.length).toBe(1)
        expect(res.body.exam.examName).toBe("Math 2")

        expect(res.body.exam.questions[0].questionContent).toBe("2 + 1 - 3 = ?")
        expect(res.body.exam.questions[0].options.length).toBe(4)
        expect(res.body.exam.questions[0].options[0].option).toBe("0")
        expect(res.body.exam.questions[0].options[1].option).toBe("1")
        expect(res.body.exam.questions[0].options[2].option).toBe("2")
        expect(res.body.exam.questions[0].options[3].option).toBe("3")
        expect(res.body.exam.questions[0].options[0].isCorrect).toBe(true)
    })

    test("Change examName, questionContent, options and add question", async () => {
        const createNewExam = await request(app)
            .post('/exams')
            .send({
                examName: "Testing for edit exam feature",
                questions: [
                    {
                        questionContent: "100 + 200 = ?",
                        options: [
                            {
                                option: "200",
                                isCorrect: false
                            },
                            {
                                option: "300",
                                isCorrect: true
                            },
                            {
                                option: "400",
                                isCorrect: false
                            },
                        ]
                    }
                ]
            })

        expect(createNewExam.statusCode).toEqual(201)
        expect(createNewExam.body.exam.examName).toBe("Testing for edit exam feature")


        const examId = createNewExam.body.exam._id;
        const questionId = createNewExam.body.exam.questions[0]._id;
        const res = await request(app)
            .put(`/exams/${examId}`)
            .send({
                examName: "new exam name",
                questions: [
                    {
                        _id: questionId,
                        questionContent: "200 + 100 = ?",
                        options: [
                            {
                                option: "300",
                                isCorrect: true
                            },
                            {
                                option: "200",
                                isCorrect: false
                            },
                            {
                                option: "400",
                                isCorrect: false
                            },
                            {
                                option: "100",
                                isCorrect: false
                            }
                        ]
                    },
                    {
                        questionContent: "50 + 70 = ?",
                        options: [
                            {
                                option: "100",
                                isCorrect: false
                            },
                            {
                                option: "110",
                                isCorrect: false
                            },
                            {
                                option: "130",
                                isCorrect: false
                            },
                            {
                                option: "120",
                                isCorrect: true
                            }
                        ]
                    }
                ]
            })

        expect(res.statusCode).toEqual(200)
        expect(res.body.exam.examName).toBe("new exam name")
        expect(res.body.exam.questions.length).toBe(2)

        expect(res.body.exam.questions[0].questionContent).toBe("200 + 100 = ?")
        expect(res.body.exam.questions[0].options.length).toBe(4)
        expect(res.body.exam.questions[0].options[0].option).toBe("300")
        expect(res.body.exam.questions[0].options[1].option).toBe("200")
        expect(res.body.exam.questions[0].options[2].option).toBe("400")
        expect(res.body.exam.questions[0].options[3].option).toBe("100")
        expect(res.body.exam.questions[0].options[0].isCorrect).toBe(true)
        expect(res.body.exam.questions[0].options[1].isCorrect).toBe(false)
        expect(res.body.exam.questions[0].options[2].isCorrect).toBe(false)
        expect(res.body.exam.questions[0].options[3].isCorrect).toBe(false)

        expect(res.body.exam.questions[1].questionContent).toBe("50 + 70 = ?")
        expect(res.body.exam.questions[1].options.length).toBe(4)
        expect(res.body.exam.questions[1].options[0].option).toBe("100")
        expect(res.body.exam.questions[1].options[1].option).toBe("110")
        expect(res.body.exam.questions[1].options[2].option).toBe("130")
        expect(res.body.exam.questions[1].options[3].option).toBe("120")
        expect(res.body.exam.questions[1].options[0].isCorrect).toBe(false)
        expect(res.body.exam.questions[1].options[1].isCorrect).toBe(false)
        expect(res.body.exam.questions[1].options[2].isCorrect).toBe(false)
        expect(res.body.exam.questions[1].options[3].isCorrect).toBe(true)
    })

    test("Test data types", async () => {
        const createNewExam = await request(app)
            .post('/exams')
            .send({
                examName: "Testing for edit exam feature",
                questions: [
                    {
                        questionContent: "100 + 200 = ?",
                        options: [
                            {
                                option: "200",
                                isCorrect: false
                            },
                            {
                                option: "300",
                                isCorrect: true
                            },
                            {
                                option: "400",
                                isCorrect: false
                            },
                        ]
                    }
                ]
            })

        const examId = createNewExam.body.exam._id;
        const questionId = createNewExam.body.exam.questions[0]._id;
        const res = await request(app)
            .put(`/exams/${examId}`)
            .send({
                examName: "Test data types",
                questions: [
                    {
                        _id: questionId,
                        questionContent: "200 + 100 = ?",
                        options: [
                            {
                                option: "300",
                                isCorrect: true
                            },
                            {
                                option: "200",
                                isCorrect: false
                            },
                            {
                                option: "400",
                                isCorrect: false
                            },
                            {
                                option: "100",
                                isCorrect: false
                            }
                        ]
                    },
                    {
                        questionContent: "50 + 70 = ?",
                        options: [
                            {
                                option: "100",
                                isCorrect: false
                            },
                            {
                                option: "110",
                                isCorrect: false
                            },
                            {
                                option: "130",
                                isCorrect: false
                            },
                            {
                                option: "120",
                                isCorrect: true
                            }
                        ]
                    }
                ]
            })

        const questions = res.body.exam.questions;
        const examName = res.body.exam.examName;
        expect(typeof examName).toBe("string");
        expect(Array.isArray(questions)).toBe(true);

        for (let i = 0; i < questions.length; i++) {
            expect(typeof questions[i].questionContent).toBe("string");
            expect(Array.isArray(questions[i].options)).toBe(true);
            for (let j = 0; j < questions[i].options.length; j++) {
                expect(typeof questions[i].options[j].option).toBe("string");
                expect(typeof questions[i].options[j].isCorrect).toBe("boolean")
            }
        }
    })

    test("edit an exam do not exist", async () => {
        const examId = "656a7a3a7a930769aa9104aa";
        const res = await request(app)
            .put(`/exams/${examId}`)
            .send({
                examName: "new exam name"
            })

        expect(res.statusCode).toEqual(404)
        expect(res.body.message).toBe("Exam not found")
    })
})