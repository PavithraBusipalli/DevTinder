const express = require('express');
const connectDB = require('./config/database');
const { User } = require('./models/user');
const app = express();
const {validateSignUpData} = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const {userAuth} = require('./middleware/auth');
const jwt = require('jsonwebtoken');
const {authRouter} = require('./routes/auth');
const {profileRouter} = require('./routes/profile');
const {requestRouter} = require('./routes/request');

// It will work of all methods to handle json data processing..!
app.use(express.json());
app.use(cookieParser());

app.use(authRouter);
app.use(profileRouter);
app.use(requestRouter);

// Get user by email
app.get('/user', async (req, res) => {
    const userEmail = req.body.email;
    try {
        const user = await User.findOne({email: userEmail});
        if(!user) {
            res.status(404).send('User not found');
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(400).send('Something went wrong');
    }
})


// Get all the users 
app.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch(err) {
        res.status(400).send("Something went wrong..!!");
    }
})

// Delete the user by id
app.delete('/deleteUser', async (req, res) => {
    const userId = req.body.id;
    try {
        const deltUser = await User.findByIdAndDelete(userId);
        if(deltUser) {
            res.send("User deleted successfully!");
        } else {
            res.send("User not found to delete")
        }
    } catch(err) {
        res.status(400).send("Something went wrong");
    } 
})

// Update the user by id
app.put('/updateUser', async (req, res) => {
    const userId = req.body.id;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["id", 'about', 'age', 'about', 'skills'];
        // ignoring email, name updates
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed) {
            throw new Error("Update not allowed!")
        }    
        const user = await User.findByIdAndUpdate(userId, data, {
            ruturnDocument: "after",
            runValidators: true,
        });
        res.send('User updated successfully');
    } catch(err) {
        res.status(400).send('Something went wrong ' + err.message);
    }
})


connectDB()
    .then(() => {
        console.log('DB Connection Success!!');
        app.listen(3000, () => {
            console.log('Server is listening..!!'); 
        })
    })
    .catch((e) => {
        console.log('DB Connection Failure!', e );
    })

