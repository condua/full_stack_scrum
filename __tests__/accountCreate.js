const app = require('../server');
const request = require('supertest');
const User = require('../models/user');

describe("createAccount", () => {
    test("Should newly created account", async () => {
        const createNewAccount = await request(app)
            .post('/register')
            .send({
                fullname: "Nguyen Van A",
                email: "testemail1@junkmail.com",
                password: "JvFWNB8B76XbRivJ",
                role: "Teacher"
            })

        expect(createNewAccount.statusCode).toEqual(201)
        expect(createNewAccount.body.message).toEqual("User registered successfully");

        const loginAccount = await request(app)
            .post('/login')
            .send({
                email: "testemail1@junkmail.com",
                password: "JvFWNB8B76XbRivJ",
            })

        expect(loginAccount.statusCode).toEqual(201)
        expect(loginAccount.body.user.email).toEqual("testemail1@junkmail.com");

        User.deleteOne({email: "testemail1@junkmail.com"})
    }, 9999)

    
})