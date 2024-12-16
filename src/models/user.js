const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength:  50,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        // validate(val) {
        //     if(!validator.isEmail(val)){
        //         throw new Error("Invalid Email address");
        //     }
        // }
    },
    password: {
        type: String,
        required: true,
        // validate(pswd) {
        //     if(!validator.isStrongPassword(pswd)){
        //         throw new Error("Weak Password");
        //     }
        // }
    },
    phoneNo: {
        type: Number
    },
    gender: {
        type: String,
        validate(val) { // custom validatores --> It will only call when u create an instance but not on updates so inorder to there, 
                        // you've mention the update
            if(!["male", "female", "others"].includes(val)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about value..!"
    },
    skills: {
        type: [String],
        validate(arr) {
            if(arr.length > 5) {
                throw new Error("Skills should not exceed 5");
            }
        }
    },
    age: {
        type: Number,
        min: 18
    }
},
{
    timestamps: true,
});

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DevTinder@2024", {
        expiresIn: "7d",
    });
    return token;
}

userSchema.methods.validatePswd = async function(passwordByUser) {
    const user = this;
    const hashPswd = user.password;
    const isPassword = await bcrypt.compare(passwordByUser, hashPswd);
}
let User = mongoose.model('User', userSchema);

module.exports = { User }