require('dotenv').config()
const mongoose = require('mongoose');
mongoose
    .connect(process.env.MONGODB_URL)
    .then(function () {
        if (process.env.NODE_ENV === 'development') {
            console.log("Connected to MongoDB in development mode");
        }
    })
    .catch(function (err) {
        console.error("Error connecting to MongoDB  -   " + err.message);
    });

module.exports = mongoose.connection;