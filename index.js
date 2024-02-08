import 'dotenv/config';
import express from "express";
import connect from "./db/db.js";

import {app} from "./app.js"



// Connecting to database
connect().then(
    app.listen(process.env.PORT || 4001, () => { console.log("serrver started succesfully"); })
).catch((err) => {
    console.log("failed");
})


    ;



app.get("/profile", (req, res) => {
    // console.log("welcome to port 2222");
    res.json({
        "name": "Milan Bhingrdiya", 
        "age": 18,
    });
})
