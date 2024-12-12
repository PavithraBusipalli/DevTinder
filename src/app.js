const express = require('express');
const connectDB = require('./config/database');
const { User } = require('./models/user');
const app = express();



app.post('/signup', async (req, res) => {
    const userObj = {
        firstName: "Sam",
        lastName: "Reddy",
        email: "Samreddy@gmail.com",
        password: "sam@2024",
        phoneNo: 9012345678,
        gender: "Female"
    }
    //creating instance of user model
    const user = new User(userObj);
    try {
        await user.save();
        res.send('User created successfully!')
    } catch(err) {
        res.status(400).json(err);
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

