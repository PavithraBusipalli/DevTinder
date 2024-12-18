const validator = require('validator');

const validateSignUpData = (req) => {
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName) {
        throw new Error ("Name should be required!");
    }
    else if(!validator.isEmail(email)) {
        throw new Error("Pls enter a valid Email!");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Pls enter a Strong Password!");
    }
}


const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "skills", "phoneNo", "age", "about"];
    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));
    return isEditAllowed;
}
module.exports = {
    validateSignUpData,
    validateEditProfileData
}