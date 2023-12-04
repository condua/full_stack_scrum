const jwt = require('jsonwebtoken');
const testLoginData = require("./data.json");
const requester = require('./commonTest').requester;

const secret = '33e63cdbf2c1b7c12bdef634d08f82bedc42a252963dfade0401af3c354cf3fa';

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

            test(`Test token return if success is verified--${testMessage}`, async function() {
                // console.log(JSON.stringify(response.body));

                if (!response.body.token && !userLogin.isValidCredential) {
                    expect(response.status === 401 || response.status === 400).toBe(true);
                    return;
                }

                expect(response.status === 200).toBe(true);

                expect( typeof(response.body.token) ).toStrictEqual("string");

                expect( typeof(response.body.user.email) ).toStrictEqual("string");

                let verifiedData = await jwt.verify(response.body.token, secret)

                expect(verifiedData.email).toStrictEqual(response.body.user.email);

                expect( typeof(verifiedData.iat) ).toStrictEqual("number");
            });

            response = null;
            called = false;
            ++index;
        }
    }
});