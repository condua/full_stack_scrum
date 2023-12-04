const app = require('../server');
const request = require('supertest');
const User = require('../models/user');
const mongoose = require('mongoose');

// Set timeout to 10 seconds
jest.setTimeout(10000);

// Wait for 3 seconds before each test to make sure the database is ready
beforeAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 3000));
});

afterAll(async () => {
  await mongoose.connection.close();
});

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

describe("createDubAccount", () => {
    test("Should return error because email already in used", async () => {
        await request(app)
            .post('/register')
            .send({
                fullname: "Nguyen Van A",
                email: "testemail1@junkmail.com",
                password: "JvFWNB8B76XbRivJ",
                role: "Teacher"
            })

        const createDupAccount = await request(app)
            .post('/register')
            .send({
                fullname: "Nguyen Van B",
                email: "testemail1@junkmail.com",
                password: "tfqOPRmjtHKfIO5l",
                role: "student"
            })

        expect(createDupAccount.statusCode).toEqual(400)
        expect(createDupAccount.body.error).toEqual("Username is already taken");

        User.deleteOne({email: "testemail1@junkmail.com"})
    }, 9999)
})
