const mongoose = require("mongoose")


// user Schema
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        gender: {
            type: String,
            required: true
        },
        jobTitle: {
            type: String,
            required: true
        },
    },
    { timestamps: true}
)

// Model for CRUD operation on Documents in collections of MongoDB

const User = mongoose.model("user" , userSchema)

module.exports = User

