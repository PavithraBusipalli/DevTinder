const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect('mongodb+srv://busipallipavithra:busipallipavithra@cluster0.hxdfq.mongodb.net/devTinder');
};

module.exports = connectDB;