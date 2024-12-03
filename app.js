const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const APIRouter = require("./Routes/APIRoutes");
const cors = require("cors");
const {dbAfter,dbBefore} = require("./Routes/debugger")
const app = express();
const PORT = 5003;
// const MONGODB_URI = 'mongodb://localhost:27017/Backend';

const MONGODB_URI = 'mongodb+srv://Leelavathy922003:Leela922003@cluster0.1jfqc.mongodb.net/Backend';
// Middleware
app.use(cors());// enable cors policy
app.use(morgan("tiny")); // Logging middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended:false}));//post

//add external routing to app.js
//middleware
app.use('/', APIRouter);


dbBefore("Connecting to db");

// Middleware to check DB connection before starting the server
mongoose.connect(MONGODB_URI)
    .then(() => {
        dbAfter("DB connected successfully");
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });
    })
    .catch((error) => {
        console.log("Unable to connect with DB");
        console.log(error);
    });
