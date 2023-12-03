const jwt = require('jsonwebtoken');
const testLoginData = require("./testUI/data.json");
const requester = require('./commonTest').requester;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // username: String,
    fullname: String,
    email: String,
    password: String,
    role:String,
});

const TESTING_ENDPOINT = "/login";

describe(`Testing DB connection: ${TESTING_ENDPOINT}`, function() {
    let response = null;
    let called = false, dbconnected = false;
    let User = null;
    let index = 0;

    while (index < testLoginData.length) {
        const userLogin = testLoginData[index];

        if (!called) {
            const testMessage = `Get response data |Number ${index+1}|--|Email: ${userLogin.email}|--|Password: ${userLogin.password}|--|Desired Output: ${userLogin.desiredOutput}|`;

            test(testMessage, function(done) {
                requester
                    .post(TESTING_ENDPOINT)
                    .set({
                       'Content-Type': 'application/json',
                       'Accept': 'application/json'
                    })
                    .send(userLogin)
                    .expect(userLogin.desiredStatus)
                    .then(function(res) {
                        response = res;
                        done();
                    })
                    .catch(function(err) {
                        console.log("Exception Occured in Testing : ", err)
                        done(err);
                    });
            });

            called = true;
        }
        else {
            const testMessage = `Data |Email: ${userLogin.email}| |Password: ${userLogin.password}|`;

            test(`Test response matched with DB--${testMessage}`, async function() {
                // console.log(JSON.stringify(response.body));

                if (!response.body.user && !userLogin.isValidCredential) {
                    expect(response.status === 401 || response.status === 400).toBe(true);
                    return;
                }

                try {
                    if (!dbconnected) {
                        await mongoose.connect('mongodb+srv://phanhoangphuc03111:phuc1755@cluster0.b576f71.mongodb.net/API-NODE?retryWrites=true&w=majority')
                        User = mongoose.model('User', userSchema);
                        dbconnected = true;
                    }
                } catch(err) {
                    throw new Error("ERROR CONNECT DB: " + err);
                }

                const user = await User.findOne({ email: response.body.user.email });

                expect(user).toBeTruthy();
                expect(response.body.user.email).toEqual(user.email);
                expect(user.role).toEqual(userLogin.role);
            });

            response = null;
            called = false;
            ++index;
        }
    }
});