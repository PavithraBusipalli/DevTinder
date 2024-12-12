const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect('mongodb+srv://busipallipavithra:busipallipavithra@cluster1.7rl85.mongodb.net/devTinder');
};

module.exports = connectDB;