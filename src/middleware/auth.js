const jwt = require('jsonwebtoken');
const {User} = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token) {
            throw new Error("Token is not valid!!");
        }
        const decodeData = await jwt.verify(token, "DevTinder@2024", {expiresIn: '1m'});
        console.log("DecodeData: ", decodeData);
        const {_id} = decodeData;
        console.log("_id: ", _id);
        
        const user = await User.findById(_id);
        if(!user) {
            throw new Error("User is not Authenticated!!");
        }
        req.user = user;
        next();
    } catch(err) {
        res.status(400).send("ERROR : " + err.message)
    }
};

module.exports = {
    userAuth
}