const express = require('express');
const connectDB = require('./config/database');
const { User } = require('./models/user');
const app = express();
const {validateSignUpData} = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require('./middleware/auth');

// It will work of all methods to handle json data processing..!
app.use(express.json());
app.use(cookieParser());

// Creating user
app.post('/signup', async (req, res) => {
    try {
        validateSignUpData(req);
        const {password, firstName, lastName, email} = req.body;
        const hashPswd = await bcrypt.hash(password, 10);
        req.body.password = hashPswd
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashPswd,
        });
        await user.save();
        res.send('User created successfully');
    } catch(err) {
        console.log("Error");
        res.status(404).send('Error: ' + err);
    }
})

// Login API
app.post('/signin', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email: email});
        if(!user) {
            throw new Error("Invalid Credentials");
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if(isPassword) {
            // Create a JWT Token
            const token = await jwt.sign({_id: user._id}, "DevTinder@2024", {expiresIn: '1m'});
            // Attaching token to cookie
            res.cookie("token", token)
            res.send("Login Successful!!");
        }
        else {
            throw new Error("Invalid Credentials!");
        }
    } catch(e) {
        res.status(400).send("ERROR : " + e.message);
    }
})

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

app.get('/profile', userAuth, async (req, res) => {
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
    .catch(() => {
        console.log('DB Connection Failure!');
    })

