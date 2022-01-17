const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true,
        },
        link_id: {
            type: String,
        },
        institution: {
            type: String
        },
        environment: {
            type: String
        },
        createdAt: {
            type: Date,
            default: new Date().toISOString()
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const User = mongoose.model('users', userSchema)

module.exports = User