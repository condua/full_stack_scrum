const app = require('../server');
const request = require('supertest');

describe("getExam", () => {
    test("should return the exam with the given examId", async () => {
        const examId = "654e0a341855d584c53a3b7e";
        const res = await request(app)
            .get(`/exams/${examId}`)

        expect(res.statusCode).toEqual(200)
    });

    test("should return the exam name with the given examId", async () => {
        const examId = "654e0a341855d584c53a3b7e";
        const res = await request(app)
            .get(`/exams/${examId}`)

        expect(res.body.exam.examName).toBe("Thì hiện đại đơn trong tiếng anh");
    });

    test("should return the exam question length is greater than 0 with the given examId", async () => {
        const examId = "654e0a341855d584c53a3b7e";
        const res = await request(app)
            .get(`/exams/${examId}`)

        expect(res.body.exam.questions.length).toBeGreaterThan(0);
    });
});

describe("editExam", () => {
    test("should return the exam name after updated", async () => {
        const examId = "656c47000735857511ca036e";
        const res = await request(app)
            .put(`/exams/${examId}`)
            .send({
                examName: "Bài thi mẫu",
            })

        expect(res.statusCode).toEqual(200)
        expect(res.body.exam.examName).toBe("Bài thi mẫu")
    })

    test("should return the exam question length is 1 after updated", async () => {
        const examId = "656c47000735857511ca036e";
        const res = await request(app)
            .put(`/exams/${examId}`)
            .send({
                examName: "Bài thi mẫu",
                questions: [
                    {
                        _id: "656c47000735857511ca036f",
                        questionContent: "1 + 1 = ?",
                        options: [
                            {
                                option: "2",
                                isCorrect: true
                            },
                            {
                                option: "3",
                                isCorrect: false
                            },
                            {
                                option: "4",
                                isCorrect: false
                            },
                        ]
                    }
                ]
            })

        expect(res.statusCode).toEqual(200)
        expect(res.body.exam.questions.length).toBe(1)
    })

    test("", async () => {
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
                                isCorrect: true
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
})