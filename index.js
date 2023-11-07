const express = require('express');


const app = express();

// Requiring module
const mongoose = require('mongoose');

// Connecting to database
const connect_to_db = mongoose.connect('mongodb+srv://milanbhingradiya:FWlw6jNW4UYjomYS@cluster0.ueumzs7.mongodb.net/',
    {
    }).then(() => {
        console.log("db connected");
    });


app.listen(2222, () => {
    console.log(" port 2222 server starred");
});



app.get("/profile", (req, res) => {
    // console.log("welcome to port 2222");
    res.json({
        "name": "Milan Bhingrdiya",
        "age": 18,
    });
})
