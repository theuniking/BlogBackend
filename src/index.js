const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParse = require('body-parser')
require('dotenv').config()
require('./models/Post');
const bodyParser = require("body-parser");
require('./models/User')

const app = express();
app.use(cors(
    // origin: 'localhost'
));
app.use(bodyParser.json())



mongoose.connect(
    process.env.MONGODB_CONNECTION_URL
)

mongoose.connection.on('connected', () => {
    console.log('connected to db');
})

app.use('/auth',require('./routes/auth'))

app.use('/posts',require('./routes/posts'))

app.listen(3004, () => {
    console.log("server is running on http://localhost:3004");
});