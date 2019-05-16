// user schema
const mongoose = require('mongoose');
var crypto = require('crypto');


//get access to Schema constructor
const Schema = mongoose.Schema;
// create a userschema
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 255,
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        maxlength: 255,
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    created_at: Date,
    updated_at: Date
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

userSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    } else {
        this.updatedAt = new Date();
    }
    next();
});

userSchema.pre('update', function (next) {
    this.updatedAt = new Date();
    next();
});

userSchema.methods.toJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        createdAt: this.createdAt
    };
}

///make this available to our admin in our Node applications 
module.exports = mongoose.model('User', userSchema);