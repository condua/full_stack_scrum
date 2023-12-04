const testLoginData = require("./data.json");

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // username: String,
    fullname: String,
    email: String,
    password: String,
    role:String,
});

mongoose.connect('mongodb+srv://phanhoangphuc03111:phuc1755@cluster0.b576f71.mongodb.net/API-NODE?retryWrites=true&w=majority', function() {
    const User = mongoose.model('User', userSchema);

    const user = await User.find().limit(10);

    testLoginData.push()
})