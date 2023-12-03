const ACCESS_TOKEN_SECRET = "33e63cdbf2c1b7c12bdef634d08f82bedc42a252963dfade0401af3c354cf3fa";
const bcrypt = require('bcrypt');

const MIN_PASSWORD_LENGTH = 6;

async function hash(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}
async function compare(passwordInput, userPassword) {
    return await bcrypt.compare(passwordInput, userPassword);
}

function generateRandomString(length) {
    const characters =
        '@#$_-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    let result = '';

    while (result.length < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

describe("Testing password encryption for Login Module!", function() {
    test("Should test matched pair of encrypted and raw password", async function() {
        const randomPassword = generateRandomString(MIN_PASSWORD_LENGTH);

        let hashed = await hash(randomPassword);

        let checkMatched = await compare(randomPassword, hashed);

        expect(checkMatched).toBe(true);
    })

    test("Should test unmatched pair of encrypted and raw password", async function() {
        const randomPassword = generateRandomString(MIN_PASSWORD_LENGTH);

        let hashed = await hash(randomPassword);

        let checkMatched = await compare(randomPassword + "_", hashed);

        expect(checkMatched).toBe(false);
    })
});