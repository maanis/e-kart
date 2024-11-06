const mongoose = require('mongoose');

mongoose
    .connect('mongodb://127.0.0.1:27017/scatch')
    .then(function () {
        console.log("Connected to MongoDB");
    })
    .catch(function (err) {
        console.error("Error connecting to MongoDB  -   " + err.message);
    });

module.exports = mongoose.connection;