const express = require('express');
const connectDB = require('./config/database');
const { User } = require('./models/user');
const app = express();

// It will work of all methods to handle json data processing..!
app.use(express.json());

// Creating user
app.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send('User created successfully');
    } catch(err) {
        res.send('Error: ', err);
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
        const user = await User.findByIdAndUpdate(userId, data);
        res.send('User updated successfully');
    } catch(err) {
        res.status(400).send('Something went wrong');
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

