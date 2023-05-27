const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false,
        unique: true
    }
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
    next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, "process.env.JWT_SECRET");
};

module.exports = mongoose.model("users", userSchema);