const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


//schema utilisateur
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

const User = mongoose.model("User", userSchema);
module.exports = User;