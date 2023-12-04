const jwt = require('jsonwebtoken');
const testLoginData = require("./data.json");
const requester = require('./commonTest').requester;

const TESTING_ENDPOINT = "/login";

describe(`Test response for POST: ${TESTING_ENDPOINT}`, function() {
    let response = null;
    let called = false;
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

            test(`Start test ${testMessage}`, function() {
                expect(response).toBeDefined();
            });

            test("1: Should test response body available", function() {
                expect(response.body).toBeDefined();
            });
    
            test("2: Should test response status matched", function() {
                expect(response.status).toEqual(userLogin.desiredStatus);
            });

            test("3: Should test response body error message available if fail", function() {
                if (response.status > 300) {
                    expect(response.body.error).toBeDefined();
                }
            });

            test("5: Should test response body error message match if fail", function() {
                if (response.status > 300) {
                    expect(response.body.error.toLowerCase()).toBe( getErrorTextByStatus(userLogin.desiredStatus) );
                }
            });

            test("6: Should test whether response data matched if success!", function() {
                if (response.status > 199 && response.status < 300) {
                    expect(response.body.user.fullname).toEqual(userLogin.fullname);

                    expect(response.body.user.email).toEqual(userLogin.email);
                }
            });

            test("7: Should test for Allow Header Authorization in response!", function() {
                expect(response.header['access-control-allow-headers']).toEqual("Content-Type, Authorization");
            });

            test("8: Should test for Bad Request When Request Has Missing Field!", function() {
                if (response.status === 400) {
                    expect(!userLogin.email || !userLogin.password).toBe(true);
                }
            });

            // else if (response.status === 200) {
            //     test("3: Should test whether response data contain token!", function() {
            //         expect( typeof(res.body.token) ).toBe("string");
            //     });

            response = null;
            called = false;
            ++index;
        }
    }
});

function getErrorTextByStatus(status) {
    switch(status) {
        case 400:
            return "bad request";
        case 404:
            return "not found";
        case 401:
            return "invalid credentials";
    }

    return "Unknown Error";
}