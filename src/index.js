const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
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

const PORT = process.env.PORT ?? 3004

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});