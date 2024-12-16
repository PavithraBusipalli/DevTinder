const express = require("express");
const router = express.Router();
const {userAuth} = require('../middleware/auth');
const {validateEditProfileData} = require('../utils/validation');

router.get('/profile/view', userAuth, async (req, res) => {
    const token = req.cookies;
    const user = req.user;
    try {
        console.log('user: ', );
        if(!token) {
            throw new Error("Invalid Token");
        }
        if(!user) {
            throw new Error("User not found!");
        }
        res.send(user);
    } catch(e) {
        res.status(400).send("ERROR : " + e.message);
    }
})


router.patch('/profile/edit', userAuth, async (req, res) => {
     try {
        if(!validateEditProfileData(req)) {
            throw new Error("Invalid data to edit")
        } else {
            const user = req.user;
            // console.log('User: ', user);
            Object.keys(req.body).forEach(key => (user[key] = req.body[key]));
            await user.save();
            console.log(user);
            res.send(`${user.firstName} Profile updated successfully..!`)
            
        }
     } catch(err) {
        res.status(400).send("ERROR: "+ err.message);
     }
})

module.exports = {
    profileRouter: router,
}