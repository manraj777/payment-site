const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/paytm')

// create a schema for user
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    fristname: String,
    lastname: String,

})
// create a model for user
const User = mongoose.model("User", userSchema);

modelue.exports = {
    User
}

