const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/paytm')

// create a schema for user
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLenght: 6,
        maxLenght: 30
    },
    password: {
        type: String,
        required: true,
        minLenght: 6,
    },
    fristname: {
        type: String,
        required: true,
        trim: true,
        maxLenght: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLenght: 50
    },

})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
})
const Account = mongoose.model("Account", accountSchema);

// create a model for user
const User = mongoose.model("User", userSchema);

modelue.exports = {
    User, Account
}

